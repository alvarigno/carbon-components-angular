import {
	Component,
	Input,
	Output,
	OnDestroy,
	EventEmitter,
	TemplateRef,
	AfterViewInit,
	ViewChild,
	ElementRef,
	ViewChildren,
	QueryList
} from "@angular/core";

import { I18n } from "../../i18n/i18n.module";
import { AbstractDropdownView } from "./../abstract-dropdown-view.class";
import { ListItem } from "./../list-item.interface";
import { watchFocusJump } from "./../dropdowntools";
import { ScrollableList } from "./../scrollable-list.directive";
import { Observable, isObservable, Subscription } from "rxjs";


/**
 * ```html
 * <ibm-dropdown-list [items]="listItems"></ibm-dropdown-list>
 * ```
 * ```typescript
 * listItems = [
 * 	{
 * 		content: "item one",
 * 		selected: false
 * 	},
 * 	{
 * 		content: "item two",
 * 		selected: false,
 * 	},
 * 	{
 * 		content: "item three",
 * 		selected: false
 * 	},
 * 	{
 * 		content: "item four",
 * 		selected: false
 * 	}
 * ];
 * ```
 */
@Component({
	selector: "ibm-dropdown-list",
	template: `
		<ul
			#list
			role="listbox"
			class="bx--list-box__menu bx--multi-select"
			[attr.aria-label]="ariaLabel">
			<li
				role="option"
				*ngFor="let item of displayItems; let i = index"
				(click)="doClick($event, item)"
				(keydown)="doKeyDown($event, item)"
				(focus)="onItemFocus(i)"
				(blur)="onItemBlur(i)"
				class="bx--list-box__menu-item"
				[ngClass]="{
					'bx--list-box__menu-item--active': item.selected,
					disabled: item.disabled
				}">
				<div
					#listItem
					tabindex="-1"
					class="bx--list-box__menu-item__option">
					<div
						*ngIf="!listTpl && type === 'multi'"
						class="bx--form-item bx--checkbox-wrapper">
						<label
							[attr.data-contained-checkbox-state]="item.selected"
							class="bx--checkbox-label">
							<input
								class="bx--checkbox"
								type="checkbox"
								[checked]="item.selected"
								[disabled]="item.disabled"
								(click)="doClick($event, item)"
								tabindex="-1">
							<span class="bx--checkbox-appearance"></span>
							<span class="bx--checkbox-label-text">{{item.content}}</span>
						</label>
					</div>
					<ng-container *ngIf="!listTpl && type === 'single'">{{item.content}}</ng-container>
					<ng-template
						*ngIf="listTpl"
						[ngTemplateOutletContext]="{item: item}"
						[ngTemplateOutlet]="listTpl">
					</ng-template>
				</div>
			</li>
		</ul>`,
	providers: [
		{
			provide: AbstractDropdownView,
			useExisting: DropdownList
		}
	]
})
export class DropdownList implements AbstractDropdownView, AfterViewInit, OnDestroy {
	@Input() ariaLabel = this.i18n.get().DROPDOWN_LIST.LABEL;
	/**
	 * The list items belonging to the `DropdownList`.
	 */
	@Input() set items (value: Array<ListItem> | Observable<Array<ListItem>>) {
		if (isObservable(value)) {
			if (this._itemsSubscription) {
				this._itemsSubscription.unsubscribe();
			}
			this._itemsSubscription = value.subscribe(v => this.updateList(v));
		} else {
			this.updateList(value);
		}
		this._originalItems = value;
	}

	get items(): Array<ListItem> | Observable<Array<ListItem>> {
		return this._originalItems;
	}
	/**
	 * Template to bind to items in the `DropdownList` (optional).
	 */
	@Input() listTpl: string | TemplateRef<any> = null;
	/**
	 * Event to emit selection of a list item within the `DropdownList`.
	 */
	@Output() select: EventEmitter<Object> = new EventEmitter<Object>();
	/**
	 * Event to suggest a blur on the view.
	 * Emits _after_ the first/last item has been focused.
	 * ex.
	 * ArrowUp -> focus first item
	 * ArrowUp -> emit event
	 *
	 * When this event fires focus should be placed on some element outside of the list - blurring the list as a result
	 */
	@Output() blurIntent = new EventEmitter<"top" | "bottom">();
	/**
	 * Maintains a reference to the view DOM element for the unordered list of items within the `DropdownList`.
	 */
	@ViewChild("list") list: ElementRef;
	/**
	 * Defines whether or not the `DropdownList` supports selecting multiple items as opposed to single
	 * item selection.
	 */
	@Input() type: "single" | "multi" = "single";
	/**
	 * Defines the rendering size of the `DropdownList` input component.
	 */
	public size: "sm" | "md" | "lg" = "md";
	/**
	 * Holds the list of items that will be displayed in the `DropdownList`.
	 * It differs from the the complete set of items when filtering is used (but
	 * it is always a subset of the total items in `DropdownList`).
	 */
	public displayItems: Array<ListItem> = [];
	/**
	 * Maintains the index for the selected item within the `DropdownList`.
	 */
	protected index = -1;
	/**
	 * An array holding the HTML list elements in the view.
	 */
	@ViewChildren("listItem") protected listElementList: QueryList<ElementRef>;
	/**
	 * Observable bound to keydown events to control filtering.
	 */
	protected focusJump;
	/**
	 * Tracks the current (if any) subscription to the items observable so we can clean up when the input is updated.
	 */
	protected _itemsSubscription: Subscription;
	/**
	 * Used to retain the original items passed to the setter.
	 */
	protected _originalItems: Array<ListItem> | Observable<Array<ListItem>>;
	/**
	 * Useful representation of the items, should be accessed via `getListItems`.
	 */
	protected _items: Array<ListItem> = [];

	/**
	 * Creates an instance of `DropdownList`.
	 */
	constructor(public elementRef: ElementRef, protected i18n: I18n) {}

	/**
	 * Retrieves array of list items and index of the selected item after view has rendered.
	 * Additionally, any Observables for the `DropdownList` are initialized.
	 */
	ngAfterViewInit() {
		this.index = this.getListItems().findIndex(item => item.selected);
		this.setupFocusObservable();
	}

	/**
	 * Removes any Observables on destruction of the component.
	 */
	ngOnDestroy() {
		if (this.focusJump) {
			this.focusJump.unsubscribe();
		}
	}

	/**
	 * Updates the displayed list of items and then retrieves the most current properties for the `DropdownList` from the DOM.
	 */
	updateList(items) {
		this._items = items.map(item => Object.assign({}, item));
		this.displayItems = this._items;
		this.index = this._items.findIndex(item => item.selected);
		this.setupFocusObservable();
		setTimeout(() => {
			if (!this.getSelected()) { return; }
			if (this.type === "single") {
				this.select.emit({ item: this._items.find(item => item.selected) });
			} else {
				this.select.emit(this.getSelected() || []);
			}
		});
	}

	/**
	 * Filters the items being displayed in the DOM list.
	 */
	filterBy(query = "") {
		if (query) {
			this.displayItems = this.getListItems().filter(item => item.content.toLowerCase().includes(query.toLowerCase()));
		} else {
			this.displayItems = this.getListItems();
		}
		// reset the index since the list has changed visually
		this.index = 0;
	}

	/**
	 * Initializes (or re-initializes) the Observable that handles switching focus to an element based on
	 * key input matching the first letter of the item in the list.
	 */
	setupFocusObservable() {
		if (this.focusJump) {
			this.focusJump.unsubscribe();
		}
		let elList = Array.from(this.list.nativeElement.querySelectorAll("li"));
		this.focusJump = watchFocusJump(this.list.nativeElement, elList)
			.subscribe(el => {
				el.focus();
			});
	}

	/**
	 * Returns the `ListItem` that is subsequent to the selected item in the `DropdownList`.
	 */
	getNextItem(): ListItem {
		if (this.index < this.displayItems.length - 1) {
			this.index++;
		}
		return this.displayItems[this.index];
	}

	/**
	 * Returns `true` if the selected item is not the last item in the `DropdownList`.
	 * TODO: standardize
	 */
	hasNextElement(): boolean {
		if (this.index < this.displayItems.length - 1) {
			return true;
		}
		return false;
	}

	/**
	 * Returns the `HTMLElement` for the item that is subsequent to the selected item.
	 */
	getNextElement(): HTMLElement {
		if (this.index < this.displayItems.length - 1) {
			this.index++;
		}
		let elem = this.listElementList.toArray()[this.index].nativeElement;
		let item = this.displayItems[this.index];
		if (item.disabled) {
			return this.getNextElement();
		}
		return elem;
	}

	/**
	 * Returns the `ListItem` that precedes the selected item within `DropdownList`.
	 */
	getPrevItem(): ListItem {
		if (this.index > 0) {
			this.index--;
		}
		return this.displayItems[this.index];
	}

	/**
	 * Returns `true` if the selected item is not the first in the list.
	 * TODO: standardize
	 */
	hasPrevElement(): boolean {
		if (this.index > 0) {
			return true;
		}
		return false;
	}

	/**
	 * Returns the `HTMLElement` for the item that precedes the selected item.
	 */
	getPrevElement(): HTMLElement {
		if (this.index > 0) {
			this.index--;
		}
		let elem = this.listElementList.toArray()[this.index].nativeElement;
		let item = this.displayItems[this.index];
		if (item.disabled) {
			return this.getPrevElement();
		}
		return elem;
	}

	/**
	 * Returns the `ListItem` that is selected within `DropdownList`.
	 */
	getCurrentItem(): ListItem {
		if (this.index < 0) {
			return this.displayItems[0];
		}
		return this.displayItems[this.index];
	}

	/**
	 * Returns the `HTMLElement` for the item that is selected within the `DropdownList`.
	 */
	getCurrentElement(): HTMLElement {
		if (this.index < 0) {
			return this.listElementList.first.nativeElement;
		}
		return this.listElementList.toArray()[this.index].nativeElement;
	}

	/**
	 * Returns the items as an Array
	 */
	getListItems(): Array<ListItem> {
		return this._items;
	}

	/**
	 * Returns a list containing the selected item(s) in the `DropdownList`.
	 */
	getSelected(): ListItem[] {
		let selected = this.getListItems().filter(item => item.selected);
		if (selected.length === 0) {
			return null;
		}
		return selected;
	}

	/**
	 * Transforms array input list of items to the correct state by updating the selected item(s).
	 */
	propagateSelected(value: Array<ListItem>): void {
		// if we get a non-array, log out an error (since it is one)
		if (!Array.isArray(value)) {
			console.error(`${this.constructor.name}.propagateSelected expects an Array<ListItem>, got ${JSON.stringify(value)}`);
		}
		for (let newItem of value) {
			// copy the item
			let tempNewItem: string | ListItem = Object.assign({}, newItem);
			// deleted selected because it's what we _want_ to change
			delete tempNewItem.selected;
			// stringify for compare
			tempNewItem = JSON.stringify(tempNewItem);
			for (let oldItem of this.getListItems()) {
				let tempOldItem: string | ListItem = Object.assign({}, oldItem);
				delete tempOldItem.selected;
				tempOldItem = JSON.stringify(tempOldItem);
				// do the compare
				if (tempOldItem.includes(tempNewItem)) {
					// oldItem = Object.assign(oldItem, newItem);
					oldItem.selected = newItem.selected;
				} else {
					oldItem.selected = false;
				}
			}
		}
	}

	/**
	 * Initializes focus in the list, effectively a wrapper for `getCurrentElement().focus()`
	 */
	initFocus() {
		// ensure we start at this first item if nothing is already selected
		if (this.index < 0) {
			this.index = 0;
		}
		this.getCurrentElement().focus();
	}

	/**
	 * Manages the keyboard accessibility for navigation and selection within a `DropdownList`.
	 */
	doKeyDown(event: KeyboardEvent, item: ListItem) {
		// "Spacebar", "Down", and "Up" are IE specific values
		if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
				if (this.listElementList.some(option => option.nativeElement === event.target)) {
					event.preventDefault();
				}
				if (event.key === "Enter") {
					this.doClick(event, item);
				}
		} else if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Down" || event.key === "Up") {
			event.preventDefault();
			if (event.key === "ArrowDown" || event.key === "Down") {
				if (this.hasNextElement()) {
					this.getNextElement().focus();
				} else {
					this.blurIntent.emit("bottom");
				}
			} else if (event.key === "ArrowUp" || event.key === "Up") {
				if (this.hasPrevElement()) {
					this.getPrevElement().focus();
				} else {
					this.blurIntent.emit("top");
				}
			}
		}
	}

	/**
	 * Emits the selected item or items after a mouse click event has occurred.
	 */
	doClick(event, item) {
		if (!item.disabled) {
			if (this.type === "single") {
				item.selected = true;
				// reset the selection
				for (let otherItem of this.getListItems()) {
					if (item !== otherItem) { otherItem.selected = false; }
				}

				this.select.emit({item});
			} else {
				item.selected = !item.selected;
				// emit an array of selected items
				this.select.emit(this.getSelected());
			}
			this.index = this.getListItems().indexOf(item);
		}
	}

	onItemFocus(index) {
		const element = this.listElementList.toArray()[index].nativeElement;
		element.classList.add("bx--list-box__menu-item--highlighted");
		element.tabIndex = 0;
	}

	onItemBlur(index) {
		const element = this.listElementList.toArray()[index].nativeElement;
		element.classList.remove("bx--list-box__menu-item--highlighted");
		element.tabIndex = -1;
	}
}

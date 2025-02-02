import { storiesOf, moduleMetadata } from "@storybook/angular";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { ButtonModule } from "./";
import { Bee20Module } from "@carbon/icons-angular/lib/bee/20";
import { Document20Module } from "@carbon/icons-angular/lib/document/20";

@Component({
	selector: "app-welcome",
	// tslint:disable:max-line-length
	template: `
		<section class="overview-page__banner" aria-label="overview page banner">
			<svg xmlns="http://www.w3.org/2000/svg" class="banner__background" viewBox="0 0 1530 823">
				<g fill="none" stroke-width="2">
					<path d="M97.3 306.07c27.19 14.46 52 10.25 75.64-7.49l-17.81-30c-11.21 10.32-25.91 15.93-41.84 7.46-18.91-10.05-24.33-30.08-11.31-54.57l13.26-24.94c13-24.5 32.66-31.2 51.57-21.14 15.93 8.47 19.17 21.33 16.13 36.28l35.88-.38c2.43-30.7-8.83-51.54-36-66-39.93-21.23-81-5.95-109 46.61S57.37 284.84 97.3 306.07z" stroke="#0B21A8" opacity=".3"></path>
					<path data-name="Path" d="M70.82 291.99c27.19 14.46 52 10.25 75.64-7.49l-17.81-30c-11.21 10.32-25.91 15.93-41.84 7.46-18.91-10.05-24.33-30.08-11.31-54.57l13.26-24.94c13-24.5 32.66-31.2 51.57-21.14 15.93 8.47 19.17 21.33 16.13 36.28l35.88-.35c2.43-30.7-8.83-51.54-36-66-39.93-21.23-81-5.95-109 46.61s-16.46 92.91 23.48 114.14z" stroke="#0B21A8" opacity=".1"></path>
					<path data-name="Path" d="M117.99 317.08c27.19 14.46 52 10.25 75.64-7.49l-17.81-30c-11.21 10.32-25.91 15.93-41.84 7.46-18.91-10.05-24.33-30.08-11.31-54.57l13.26-24.94c13-24.5 32.66-31.2 51.57-21.14 15.93 8.47 19.17 21.33 16.13 36.28l35.88-.35c2.43-30.7-8.83-51.54-36-66-39.93-21.23-81-5.95-109 46.61s-16.45 92.9 23.48 114.14z" stroke="#0B21A8"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path d="M53.84351034 664.3264129l135.35957093-54.68881657 54.68881657 135.35957093-135.35957092 54.68881658z"></path>
					<path data-name="Rectangle-2" opacity=".3" d="M28.5999305 655.32682863l135.35957094-54.68881657L218.648318 735.997583 83.2887471 790.68639955z"></path>
					<path data-name="Rectangle-2" opacity=".1" d="M1.30727542 647.15849654l135.35957092-54.68881657 54.68881658 135.35957093L55.996092 782.51806747z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Rectangle-2" d="M1036.59884943 252.91132245l134.84475598-57.238203 57.23820302 134.84475597-134.84475598 57.238203z"></path>
					<path data-name="Rectangle-2" opacity=".3" d="M1045.19015696 227.4304784l134.844756-57.23820302 57.238203 134.84475598-134.84475598 57.238203z"></path>
					<path data-name="Rectangle-2" opacity=".1" d="M1052.2449 200.6052l134.7708-57.1311 57.1311 134.7708-134.7708 57.1311z" stroke-width="1.9985"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Rectangle-2" d="M1220.759993 667.64245583l129.00175408-57.43528137 57.43528137 129.00175407-129.00175408 57.43528137z"></path>
					<path data-name="Rectangle-2" opacity=".3" d="M1253.4022198 678.64557183l129.0017541-57.43528137 57.43528136 129.00175408-129.00175408 57.43528137z"></path>
					<path data-name="Rectangle-2" opacity=".1" d="M1293.25129392 693.23574483l129.00175408-57.43528137 57.43528137 129.00175408-129.00175408 57.43528137z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Rectangle-2" d="M326.96903197 217.8200386l89.4721883-127.7795274 127.7795274 89.47218832-89.4721883 127.7795274z"></path>
					<path data-name="Rectangle-2" opacity=".3" d="M324.28116742 170.27180653l89.4721883-127.7795274 127.7795274 89.47218832-89.4721883 127.7795274z"></path>
					<path data-name="Rectangle-2" opacity=".1" d="M309.8023 128.7689L398.7166.8571l127.9118 88.9143-88.9143 127.9118z" stroke-width="1.9973"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<circle cx="330.25" cy="343.51" r="65.56" transform="translate(-94.02 125.42) rotate(-19)"></circle>
					<circle data-name="Oval" cx="304.83" cy="331.11" r="65.56" transform="translate(-91.37 116.47) rotate(-19)" opacity=".3"></circle>
					<circle data-name="Oval" cx="279.41" cy="318.71" r="65.56" transform="translate(-88.72 107.52) rotate(-19)" opacity=".1"></circle>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path d="M664.58 377.77l-163.43-31.24L610.9 220.28l53.68 157.49z"></path>
					<path data-name="Triangle" opacity=".3" d="M692.39 366.28l-163.42-31.23L638.72 208.8l53.67 157.48z"></path>
					<path data-name="Triangle" opacity=".1" d="M725.64 350.6l-163.42-31.23 109.75-126.25 53.67 157.48z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Triangle" d="M74.92 510.53l11.09-166.01 138.68 93.54-149.77 72.47z"></path>
					<path data-name="Triangle" opacity=".3" d="M89.71 536.74l11.09-166.01 138.68 93.54-149.77 72.47z"></path>
					<path data-name="Triangle" opacity=".1" d="M109.33 567.83l11.08-166.01 138.69 93.54-149.77 72.47z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Triangle" d="M1140.96 534.62l77.65-147.15 88.64 141.86-166.29 5.29z"></path>
					<path data-name="Triangle" opacity=".3" d="M1143.81 564.58l77.65-147.15 88.65 141.86-166.3 5.29z"></path>
					<path data-name="Triangle" opacity=".1" d="M1149.08 600.96l77.65-147.15 88.65 141.86-166.3 5.29z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path d="M246.65 550.67l60.69-50.93 74.44 27.1 13.76 78.02-60.69 50.93-74.45-27.1-13.75-78.02z"></path>
					<path data-name="Polygon" opacity=".3" d="M286.13 542.09l60.69-50.93 74.45 27.1 13.76 78.02-60.69 50.92-74.45-27.09-13.76-78.02z"></path>
					<path data-name="Polygon" opacity=".1" d="M324 527.85l60.69-50.92 74.45 27.09 13.75 78.02-60.69 50.93-74.45-27.1L324 527.85z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Polygon" d="M1062.61 673.33h-82.18l-41.09-71.17 41.09-71.17h82.18l41.09 71.17-41.09 71.17z"></path>
					<path data-name="Polygon" opacity=".3" d="M1025.51 653.82h-82.18l-41.09-71.17 41.09-71.17h82.18l41.09 71.17-41.09 71.17z"></path>
					<path data-name="Polygon" opacity=".1" d="M985.93 639.88h-82.18l-41.09-71.17 41.09-71.17h82.18l41.1 71.17-41.1 71.17z"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<path data-name="Polygon" d="M753.93 90.33h99.99l49.99 86.59-49.99 86.59h-99.99l-50-86.59 50-86.59z"></path>
					<path data-name="Polygon" opacity=".3" d="M799.07 114.06h99.98l50 86.6-50 86.59h-99.98l-50-86.59 50-86.6z"></path>
					<path data-name="Polygon" opacity=".1" d="M843.05 121.65h99.98l50 86.59-50 86.59h-99.98l-50-86.59 50-86.59z"></path>
				</g>
				<g data-name="c1" fill="none" stroke-width="2">
					<path data-name="Path" d="M563.82 784.63c27.68-13.5 38.88-36.08 38.4-65.59l-34.77-3.24c1.76 15.14-2.34 30.33-18.56 38.24-19.24 9.39-38.64 2-50.8-22.93l-12.38-25.39c-12.16-24.94-6-44.76 13.21-54.15 16.22-7.91 28.53-3 38.83 8.28l20.81-29.23c-23.41-20-46.89-23.15-74.57-9.65-40.65 19.83-52.44 62.06-26.35 115.56s65.55 67.92 106.18 48.1z" stroke="#0B21A8" opacity=".3"></path>
					<path data-name="Path" d="M536.88 797.78c27.68-13.5 38.88-36.08 38.4-65.59l-34.77-3.24c1.76 15.14-2.34 30.33-18.56 38.24-19.24 9.39-38.64 2-50.8-22.93l-12.33-25.41c-12.16-24.94-6-44.76 13.21-54.15 16.22-7.91 28.53-3 38.83 8.28l20.81-29.23c-23.41-20-46.89-23.15-74.57-9.65-40.65 19.83-52.44 62.06-26.35 115.56s65.48 67.94 106.13 48.12z" stroke="#0B21A8" opacity=".05"></path>
					<path data-name="Path" d="M584.9 774.35c27.68-13.5 38.88-36.08 38.4-65.59l-34.77-3.24c1.76 15.14-2.34 30.33-18.56 38.24-19.24 9.39-38.64 2-50.8-22.93l-12.35-25.4c-12.16-24.94-6-44.76 13.21-54.15 16.22-7.91 28.53-3 38.83 8.28l20.81-29.23c-23.41-20-46.89-23.15-74.57-9.65-40.68 19.83-52.47 62.06-26.38 115.51s65.53 68 106.18 48.16z" stroke="#0B21A8"></path>
				</g>
				<g fill="none" stroke-width="2">
					<path data-name="Path" d="M1374.96 528.33c25.53 17.22 50.69 15.63 76 .46l-14.58-31.74c-12.23 9.09-27.43 13.14-42.39 3-17.75-12-21.06-32.46-5.54-55.46l15.8-23.42c15.51-23 35.74-27.61 53.49-15.64 15 10.09 16.84 23.22 12.25 37.77l35.72 3.4c5.62-30.28-3.4-52.18-28.92-69.4-37.5-25.29-80-14.39-113.25 35s-26.08 90.74 11.42 116.03z" stroke="#0B21A8" opacity=".3"></path>
					<path data-name="Path" d="M1350.09 511.56c25.53 17.22 50.69 15.63 76 .46l-14.58-31.74c-12.23 9.09-27.43 13.14-42.39 3-17.75-12-21.06-32.46-5.54-55.46l15.8-23.42c15.51-23 35.74-27.61 53.49-15.64 15 10.09 16.84 23.22 12.25 37.77l35.72 3.4c5.62-30.28-3.4-52.18-28.92-69.4-37.5-25.29-80-14.39-113.25 35s-26.07 90.73 11.42 116.03z" stroke="#0B21A8" opacity=".05"></path>
					<path data-name="Path" d="M1394.39 541.43c25.53 17.22 50.69 15.63 76 .46l-14.57-31.7c-12.23 9.09-27.43 13.14-42.39 3-17.75-12-21.06-32.46-5.54-55.46l15.8-23.42c15.51-23 35.74-27.61 53.49-15.64 15 10.09 16.84 23.22 12.25 37.77l35.72 3.4c5.62-30.28-3.4-52.18-28.92-69.4-37.5-25.29-80-14.39-113.25 35s-26.09 90.75 11.41 115.99z" stroke="#0B21A8"></path>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<circle data-name="Oval" cx="1400.43" cy="210.27" r="79.61" transform="translate(1116.98 1596.97) rotate(-87)"></circle>
					<circle data-name="Oval" cx="1374.91" cy="233.25" r="79.61" transform="translate(1069.84 1593.26) rotate(-87)" opacity=".3"></circle>
					<circle data-name="Oval" cx="1349.38" cy="256.23" r="79.61" transform="translate(1022.7 1589.55) rotate(-87)" opacity=".1"></circle>
				</g>
				<g fill="none" stroke="#0B21A8" stroke-width="2">
					<circle data-name="Oval" cx="788.73" cy="678.37" r="79.61" transform="matrix(0.97, -0.26, 0.26, 0.97, -148.88, 226.44)"></circle>
					<circle data-name="Oval" cx="758.98" cy="661.2" r="79.61" transform="matrix(0.97, -0.26, 0.26, 0.97, -145.45, 218.16)" opacity=".3"></circle>
					<circle data-name="Oval" cx="729.24" cy="644.03" r="79.61" transform="matrix(0.97, -0.26, 0.26, 0.97, -142.01, 209.88)" opacity=".1"></circle>
				</g>
			</svg>

			<h1 class="banner__title"><span class="banner__logo--bold">Carbon</span> Components Angular</h1>
			<h2 class="banner__subtitle">An Angular implementation of the Carbon Design System</h2>

			<div style="display: inline">
				<a ibmButton="secondary" class="banner__btn" href="http://127.0.0.1:8887/docs/documentation/index.html" target="_blank">
					Documentation
					<svg ibmIconDocument20 class="bx--btn__icon"></svg>
				</a>
				&nbsp;
				<a ibmButton="primary" class="banner__btn" href="https://github.com/alvarigno/carbon-components-angular" target="_blank">
					Starter App
					<svg ibmIconBee20 class="bx--btn__icon"></svg>
				</a>
			</div>
		</section>
	`,
	// tslint:enable:max-line-length
	styles: [`
		.overview-page__banner {
			height: 100vh;
			background: #5596e6;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.banner__background {
			position: fixed;
		}
		.banner__title {
			font-size: 3.3vw;
			margin-top: 8vw;
			color: #fff;
			text-transform: uppercase;
			letter-spacing: 1px;
			position: relative;
		}
		.banner__subtitle {
			font-size: 1.8vw;
			color: #fff;
			z-index: 2
		}
		.banner__btn {
			margin-top: 20px;
			border-color: #fff;
		}
		.banner__logo--bold, .banner__logo span {
			font-weight: 600;
		}
		@media screen and (min-width: 1515px) {
			.banner__title {
			   font-size: 50px;
			}
			.banner__subtitle {
				font-size: 28px;
			}
		}
	`]
})
class WelcomeStory implements OnInit, OnDestroy {
	ngOnInit() {
		document.querySelector(".sb-show-main").classList.add("full-page");
	}
	ngOnDestroy() {
		document.querySelector(".sb-show-main").classList.remove("full-page");
	}
}


storiesOf("Welcome", module)
.addDecorator(
	moduleMetadata({
		imports: [ButtonModule, Bee20Module, Document20Module],
		declarations: [WelcomeStory]
	})
)

.add("to Carbon Angular", () => ({
	template: `<app-welcome></app-welcome>`
}));

import {
  materializeInitialize
} from './assets/scripts/Libraries/materializeInitialize.js';
import {
  MaterializeSelectFixed
} from './assets/scripts/Libraries/MaterializeSelectFixed.js'
import {
  FetchData
} from './assets/scripts/Database/FetchData.js';
import {
  CardDayStartEnd
} from './assets/scripts/Cards/CardDayStartEnd.js';
import {
  CardDayRecord
} from './assets/scripts/Cards/CardDayRecord.js';
import {
  GoalCards
} from './assets/scripts/Cards/GoalCards.js';

class App {
  constructor() {
    materializeInitialize();
    MaterializeSelectFixed();
    new FetchData();
    new CardDayStartEnd();
    new CardDayRecord();
    new GoalCards();
  }
}

new App();

// test below

(function($) { 'use strict';
	$(document).ready(function(){'use strict';
		//Scroll back to top

		const progressPath = document.querySelector('.progress-wrap path');
		const pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
		const updateProgress = function () {
			const scroll = $(window).scrollTop();
			const height = $(document).height() - $(window).height();
			const progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
      console.log(progress);
		}
		// updateProgress();
		$(window).scroll(updateProgress);

    // toggle show / hide
		const offset = 50;
		const duration = 550;
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.progress-wrap').addClass('active-progress');
			} else {
				jQuery('.progress-wrap').removeClass('active-progress');
			}
		});

    // back to top
		jQuery('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})


	});

})(jQuery);

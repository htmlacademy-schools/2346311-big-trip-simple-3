import {render} from './framework/render.js';
import ModelWaypoint from './model/trip-point-model.js';
import {WaypointsApiService} from './api/trip-point-api-service.js';
import ModelOffer from './model/offers-model.js';
import ModelDestinations from './model/destinations-model.js';
import ModelFilters from './model/filter-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CreateTripEventButton from './view/new-trip-point-button.js';


const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const headerBlock = document.querySelector('.trip-main');


const AUTHORIZATION = 'Basic qwerty';
const END_POINT = 'https://18.ecmascript.pages.academy/big-tri';


const tripEventApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);


const tripEventModel = new ModelWaypoint({tripEventApiService});


const offerModel = new ModelOffer({tripEventApiService});
const destinationModel = new ModelDestinations({tripEventApiService});
const filterModel = new ModelFilters();


const tripPresenter = new BoardPresenter(
  tripEventsSection,
  {
    tripEventModel,
    destinationModel,
    offerModel,
    filterModel,
    onCreateTripEventDestroy
  });

const filterPresenter = new FilterPresenter({filterContainer, filterModel, tripEventModel});


const createTripEventButton = new CreateTripEventButton({
  onClick: () => {
    tripPresenter.createEvent();
    createTripEventButton.element.disabled = true;
  }
});


function onCreateTripEventDestroy() {
  createTripEventButton.element.disabled = false;
}


tripEventModel.init().finally(() => render(createTripEventButton, headerBlock));
tripPresenter.init();
filterPresenter.init();

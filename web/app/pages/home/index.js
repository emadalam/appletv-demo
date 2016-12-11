import ATV from 'atvjs';
import template from './template.hbs';
import API from 'lib/api';

var HomePage = ATV.Page.create({
	name: 'home',
	template: template,
	ready(options, resolve, reject) {
		let getPopularMovies = ATV.Ajax.get(API.popularMovies);
		let getPopularTvShows = ATV.Ajax.get(API.popularTvShows);

		Promise
			.all([getPopularMovies, getPopularTvShows])
			.then((xhrs) => {
				let movies = xhrs[0].response;
				let tvShows = xhrs[1].response;

				resolve({
					movies: movies.results,
					tvShows: tvShows.results
				});
			}, (xhr) => {
				// error
				reject();
			})
	}
});

export default HomePage;
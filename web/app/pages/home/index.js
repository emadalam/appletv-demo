import ATV from 'atvjs';
import { buildAndReplaceInContext } from 'lib/ui';
import template from './template.hbs';
import listTemplate from './list.template.hbs';
import API from 'lib/api';

const UPDATE_INTERVAL = 10000;

let fetching = false;

function fetchMoviesAndTVShows() {
	let getPopularMovies = ATV.Ajax.get(API.popularMovies);
	let getPopularTvShows = ATV.Ajax.get(API.popularTvShows);
	let resolve; let reject;
	let promise = new Promise((...args) => [resolve, reject] = args);

	fetching = true;

	Promise
		.all([getPopularMovies, getPopularTvShows])
		.then((xhrs) => {
			fetching = false;

			let movies = xhrs[0].response;
			let tvShows = xhrs[1].response;

			resolve({
				movies: movies.results,
				tvShows: tvShows.results
			});
		}, (xhr) => {
			fetching = false;
			// error
			reject(xhr);
		});

	return promise;
}

const HomePage = ATV.Page.create({
	name: 'home',
	template: template,
	ready(options, resolve, reject) {
		fetchMoviesAndTVShows().then(resolve, reject);
	},
	afterReady(doc) {
		setInterval(() => {
			if (fetching) return;

			fetchMoviesAndTVShows()
				.then(results => {
					buildAndReplaceInContext({
						document: doc,
						template: listTemplate,
						context: doc.getElementsByTagName('collectionList').item(0),
						items: results
					});
				}).catch(xhr => {
					// error
				});
		}, UPDATE_INTERVAL);
	}
});

export default HomePage;
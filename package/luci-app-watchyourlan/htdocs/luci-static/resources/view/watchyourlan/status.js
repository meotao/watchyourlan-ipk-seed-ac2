'use strict';
'require view';

return view.extend({
	render: function() {
		const url = '%s//%s:8840/'.format(
			window.location.protocol,
			window.location.hostname
		);

		return E('div', { 'class': 'cbi-map' }, [
			E('h2', {}, [ _('WatchYourLAN') ]),
			E('p', {}, [
				_('WatchYourLAN scans hosts on the configured network interface.')
			]),
			E('p', {}, [
				E('a', {
					'class': 'btn cbi-button cbi-button-action',
					'href': url,
					'target': '_blank',
					'rel': 'noopener noreferrer'
				}, [ _('Open WatchYourLAN') ])
			])
		]);
	}
});

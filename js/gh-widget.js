function http(method, url, onSuccess) {
    var request = new XMLHttpRequest()
    request.open(method, url)
    request.onload = function() {
        if (request.status === 200) {
            onSuccess(JSON.parse(request.responseText))
        }
    }

    request.send()
}

function Avatar(props) {
    return React.createElement('img', {
        src: props.avatar_url,
        className: 'img-circle media-object',
        width: 48,
        height: 48
    })
}

function Heading(props) {
	return React.createElement('span', {
		style: { display: 'block' },
		className: 'h6 media-heading'
	},

	new Date(props.created_at).toLocaleString()
	)	
}

function EventItem(props) {
	var plural = " commits.";
	var commits = props.payload.commits.length;
	if(props.payload.commits.length === 1){
		plural = " commit.";
	}
    return React.createElement('li',
        { className: 'media', key: props.id },
        React.createElement('div',
            { className: 'media-left media-middle' },
            Avatar(props.actor)
        ),

        React.createElement('a',
            { className: 'media-body' },
            Heading(props),
            props.type + " with " + commits.toString() + plural 
        )
    );
}

function Root(props) {
    return React.createElement('ul', {
        className: 'media-list'
    }, props.events.map(EventItem));
}

function renderEvents(container, events) {
    ReactDOM.render(Root({ events: events }), container);
}

function getEventsUrl(user) {
    return 'https://api.github.com/repos/' + user + '/' + user + '.github.io/events';
}

var container = document.getElementById('gh-app');
http('GET', getEventsUrl('narsi1ion'),
    renderEvents.bind(null, container));


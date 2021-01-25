$('.skip-to-content').on('click', function(event) {
    event.preventDefault();

    let content = $('#content');

    console.log('content', content);
    
    if(!content) content = $('main');
    if(!content) return;

    const focusable = $('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', content);

    console.log('focus', focusable);

    const first = focusable[0];

    console.log('first', first);

    if(first) {
        first.focus();
    }
});
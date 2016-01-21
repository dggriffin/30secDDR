FlowRouter.route('/blog/:postId', {
    action: function(params, queryParams) {
        console.log("Yeah! We are on the post:", params.postId);
    }
});

FlowRouter.route('/', {
  name: 'homepage'
});

FlowRouter.route('/spotify', {
  name: 'spotify'
});
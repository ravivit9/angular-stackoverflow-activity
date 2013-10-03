describe('stackoverflow.activity tests', function () {
    var svc, httpBackend;

    beforeEach(function (){  
      module('ngResource');
      module('stackoverflow.activity');
      inject(function($httpBackend, StackoverflowActivityService) {
        svc = StackoverflowActivityService;      
        httpBackend = $httpBackend;
      });
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should send the message and return the response', function (){
        var returnData = { testing: 'anything'};
        httpBackend.expectJSONP('http://api.stackexchange.com/2.1/users/gigablox/timeline?callback=JSON_CALLBACK').respond(returnData);
        svc.events({
            user:'gigablox',
            params:{
                callback:'JSON_CALLBACK'
            }
        }).search(function(user) {
            expect(user.testing).toEqual('anything');
        });
        httpBackend.flush();
    });
});
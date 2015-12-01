FarmbotJS._instanceMethods = {
  connect: function(){
    var executor = function(resolve, reject) {
      var that = this;
      var me = {
        uuid: "73425170-2660-49de-acd9-6fad4989aff6",
        token: "bcbd352aaeb9b7f18214a63cb4f3b16b89d8fd24"
      };
      var you = { uuid: that.options.uuid, token: that.options.token };
      var completed = false;
      this.socket = io.connect(FarmbotJS.config.defaultOptions.meshServer);
      this.socket.on('*', function(){ console.log('*') });
      this.socket.on('connect', function() {
        that.socket.on('identify', function(data) {
          that.socket.emit('identity', me);
          that.socket.emit('subscribe', you,
            function(data) {
              var completed = true; // Stop the timeout from hapening
              if (data.error) {
                that.socket.disconnect();
                reject(data.error)
              } else{
                resolve(data);
              };
            });
        });
      })
      setTimeout(function(){
        if (!completed) { reject(new Error("Connection timed out")) };
      }, this.options.timeout)
    };
    var promise = new window.Promise(executor.bind(this));
    debugger;
    return promise;
  }
}

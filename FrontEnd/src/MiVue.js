       

    /**
     * Instancia de VueJs
     */
    var app = new Vue({
      el: '#tasking',
      data: {
        name: "",
        pagina: "listar",
      },
			created: function(){
				axios.get('http://localhost:3000/tasks').then(function (response) {
          this.response= response.data;
          console.log(this.response)
				}).catch(function (error) {
					console.log(error);
				});
      }
		});
      

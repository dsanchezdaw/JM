(function($) {

	"use strict";


	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
  	$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOutLeft',
	    animateIn: 'fadeInDown',
	    nav:true,
	    dots: true,
	    autoplayTimeout:6000,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	    }, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter, .ftco-appointment').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

    $('.appointment_time').timepicker();


    var includeHTML = function () {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            /*search for elements with a certain atrribute:*/
            file = elmnt.getAttribute("include-html");
            if (file) {
                /* Make an HTTP request using the attribute value as the file name: */
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                        if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                        /* Remove the attribute, and call this function once more: */
                        elmnt.removeAttribute("include-html");
                        includeHTML();
                    }
                }
                xhttp.open("GET", file, true);
                xhttp.send();
                /* Exit the function: */
                return;
            }
        }
    }
    includeHTML();
})(jQuery);


//user session
$user = null;
function loadUserModal() {
    $.ajax({
        url: 'usuario.html',
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('div.userModals').html(data);
            getUserSession();
        }
    });
};

function onClickSignOut() {
    if (confirm("¿ Seguro que quieres cerrar sesión ?")) {
        jQuery.ajax({
            type: "POST",
            async: false,
            url: 'functions.php',
            dataType: 'json',
            data: { functionName: 'signOut' },

            success: function (obj, textstatus) {
                if (obj['sessionClosed']) {
                    alert('Se ha cerrado sesión.');
                    location.reload(true);
                }
            },
            error: function (xhr, status, error) {
                alert("Ha ocurrido un error. No se ha podido cerrrar la sesión.");
                event.preventDefault();
            }
        });
    } else {
        $('div#user_form').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };
};

function getUserSession() {
    $.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUserSession' },

        success: function (obj, textstatus) {
            this.$user = obj['user'];

            if (this.$user) {
                if (this.$user['rol'] == 'admin') {
                    $('#cmsList').html('<a href="cms.html" class="nav-link">Gestión</a>');
                }
                $('#userPage').html('<a href="userPage.html" class="nav-link">Cuenta</a>');
                $('#session').html('<div class="modal-header"><h4 class="modal-title">Cerrar sesión</h4></div>'
                    + '<div class="modal-body row m-3"><button type="button" id="signOut" class="btn btn-danger col-md-6" onclick="onClickSignOut()">Cerrar sesión</button>'
                    + '<button type="button" class="btn btn-primary col-md-6" data-dismiss="modal">Cerrar</button></div>');
            }
        }
    });
};

function getUserSessionCms() {
    $.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUserSession' },

        success: function (obj, textstatus) {
            this.$user = obj['user'];

            if (!this.$user || !this.$user['rol'] == 'admin') {
                window.location.replace("/index.html")
            }
        }
    });
};

function getUserSessionUserPage() {
    $.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUserSession' },

        success: function (obj, textstatus) {
            this.$user = obj['user'];

            if (!this.$user) {
                window.location.replace("/index.html")
            } else {
                $('#updateUsername').val(this.$user['user_name']);
                $('#password').val(this.$user['password']);
                $('#updateName').val(this.$user['name']);
                $('#updateDni').val(this.$user['dni']);
                $('#updateEmail').val(this.$user['email']);
                $('#id').val(this.$user['id']);
            }
        }
    });
};

function onChangePass() {
    var data = $('form#changePass').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    $oldPassEncoded = CryptoJS.MD5(data['oldPass']).toString();
    if (data['password'] == $oldPassEncoded) {
        changePass(data);        
    } else {
        alert('La contraseña antigua no es la correcta.')
    }    

    event.preventDefault();
};

function changePass(data) {
    var form_data = new FormData();

    form_data.append('functionName', 'changePass');
    form_data.append('pass', CryptoJS.MD5(data['newPass']).toString());
    form_data.append('id', data['id']);

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: form_data,
        success: function (obj, textstatus) {
            if (!obj['error']) {
                alert('Contraseña cambiada');

                $('div#user_pass').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            } else {
                alert('No se ha podido cambiar la contraseña');
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error.");
        }
    });
}

function onSubmitLogin() {
    $user = $('#user').val();
    $pass = $('#password').val();

    $passEncoded = CryptoJS.MD5($pass).toString();

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getUser', user: $user, pass: $passEncoded },

        success: function (obj, textstatus) {
            if (!obj['userExist']) {
                alert('Este usuario no existe');
                event.preventDefault();
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error. No se ha podido iniciar sesión.");
            event.preventDefault();
        }
    });
}

function onAddNewUser() {
    var data = $('form#adduser').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    var isValidDni = isValidDNI(data['dni']);

    if (!isValidDni) {
        event.preventDefault();
        return;
    }
    var form_data = new FormData();
    form_data.append('functionName', 'addUser');
    form_data.append('password', CryptoJS.MD5(data['password']).toString());
    form_data.append('name', data['name']);
    form_data.append('dni', data['dni']);
    form_data.append('email', data['email']);
    form_data.append('username', data['username']);

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: form_data,
        success: function (obj, textstatus) {
            if (obj['error']) {
                alert(obj['error']);
                event.preventDefault();
            } else {
                alert(obj['msg']);
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error. No se ha podido hacer el registro.");
            event.preventDefault();
        }
    });
}

function onSendPass() {
    var data = $('form#newPass').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    var form_data = new FormData();

    $arr = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    $pass = '';
    for (var i = 10; i > 0; i--) {
        $pass +=
            $arr[Math.floor(Math.random() * $arr.length)];
    }
    form_data.append('functionName', 'sendNewPass');
    form_data.append('passEncoded', CryptoJS.MD5($pass).toString());
    form_data.append('pass', $pass);
    form_data.append('email', data['email']);

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: form_data,
        success: function (obj, textstatus) {
            if (obj['error']) {
                alert(obj['error']);
                event.preventDefault();
            } else {
                alert(obj['msg']);
                event.preventDefault();
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error. No se ha podido solicitar la nueva contraseña.");
            event.preventDefault();
        }
    });
}

function onEditUser() {
    var data = $('form#updateUser').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    var isValidDni = isValidDNI(data['dni']);

    if (!isValidDni) {
        event.preventDefault();
        return;
    }
    var form_data = new FormData();
    form_data.append('functionName', 'editUser');
    form_data.append('name', data['name']);
    form_data.append('dni', data['dni']);
    form_data.append('email', data['email']);

    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        contentType: false,
        processData: false,
        data: form_data,
        success: function (obj, textstatus) {
            if (obj['error']) {
                alert(obj['error']);
                event.preventDefault();
            } else {
                alert(obj['result']);
                event.preventDefault();
            }
        },
        error: function (xhr, status, error) {
            alert("Ha ocurrido un error. No se ha podido hacer el registro.");
            event.preventDefault();
        }
    });
}

function loadClass() {
    jQuery.ajax({
        type: "POST",
        url: 'functions.php',
        data: { functionName: 'getClass' },
        success: function (obj, textstatus) {
            var $classHtml = obj["result"];
            $dni = null;
            $name = null;
            if (obj['user']) {
                $dni = obj['user']['dni'];
                $name = obj['user']['name'];
            }
            $('#modals').html(getClassFormForHtml($classHtml, $dni, $name));
            $('#classList').html(getClassForHtml($classHtml));
            $('#scripts').html(getScripts($classHtml));
        },
        error: function (xhr, status, error) {
            alert("No se ha podido conectar con las clases.");
        }
    });
};

function getClassForHtml(classObj) {
    $classHtml = "";
    for (var i = 0; i < classObj['length']; i++) {

        if (classObj[i]['logo']['length'] > 0) {
            $logo = classObj[i]['logo'];
        } else {
            $logo = "images/jm_logo.jpeg";
        }

        $classHtml = $classHtml + '<div class="col-md-6 col-lg-4 d-flex ftco-animate fadeInUp ftco-animated">';
        $classHtml = $classHtml + '<div class="blog-entry align-self-stretch">';
        $classHtml = $classHtml + '<div class="block-20" style="background-image: url(' + $logo + ');">';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '<div class="text p-4">';
        $classHtml = $classHtml + '<h3 class="heading">' + classObj[i]['name'] + '</h3>';
        $classHtml = $classHtml + '<p><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#form_' + classObj[i]['id'] + '">Pedir cita</button></p>';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '</div>';
        $classHtml = $classHtml + '</div>';
    };
    return $classHtml
};

function getClassFormForHtml(classObj, dni, name) {
    $modals = "";
    for (var i = 0; i < classObj['length']; i++) {
        $modals = $modals + '<div class="modal" id="form_' + classObj[i]['id'] + '">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<form class="p-5 bg-light" method="POST" id="form_' + classObj[i]['id'] + '" >'
            + '<div class="modal-header">'
            + '<h4 class="modal-title">Pedir cita - ' + classObj[i]['name'] + '</h4>'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<div class="comment-form-wrap pt-5">';
        if (dni == null || name == null) {
            $modals = $modals + '<div class="form-group">'
                + '<label for="name">Nombre y apellidos *</label>'
                + '<input type="text" class="form-control" id="name_' + classObj[i]['id'] + '" placeholder="Nombre y apellidos" required>'
                + '</div>'
                + '<div class="form-group">'
                + '<label for="dni">DNI *</label>'
                + '<input type="text" class="form-control" id="dni_' + classObj[i]['id'] + '" placeholder="00000000X" required>'
                + '</div>';
        } else {
            $modals = $modals + '<input type="hidden" class="form-control" id="name_' + classObj[i]['id'] + '" placeholder="Nombre y apellidos" value="' + name + '" required>'
                + '<input type="hidden" class="form-control" id="dni_' + classObj[i]['id'] + '" placeholder="00000000X" value="' + dni + '" required>';
        }
        
        $modals = $modals + '<!-- calendar -->'
            + '<div class="form-group">'
            + '<label for="date">Día *</label>'
            + '<input type="text" name="date" class="form-control datepicker datepicker_' + classObj[i]['id'] + '" id="date_' + classObj[i]['id'] + '" autocomplete="off" readonly required>'
            + '</div>'
            + '<!-- hour -->'
            + '<div class="form-group">'
            + '<label for="date">Hora</label>'
            + '<select name="hour" class="custom-select" id="hour_' + classObj[i]['id'] + '" required>';

        $hours = classObj[i]['hours'].split(",");

        for (var j = 0; j < $hours['length']; j++) {
            $d = new Date();
            $h = $d.getHours() + ":" + $d.getMinutes();
            $hour = $hours[j].substring(0, 5);

            if ($h > $hour.substring(0, 5)) {
                $modals = $modals + '<option value="' + $hour + '">' + $hours[j] + '</option>';
            };
        };

        $modals = $modals + '</select>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<!-- Modal footer -->'
            + '<div class="modal-footer">'
            + '<input type="hidden" id="class_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['id'] + '" />'
            + '<input type="hidden" id="className_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['name'] + '" />'
            + '<input type="hidden" id="pax_' + classObj[i]['id'] + '" name="class" value="' + classObj[i]['pax'] + '" />'
            + '<input type="submit" class="btn btn-primary" value="Reservar"/>'
            + '<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>'
    };
    return $modals;
};

function getScripts(classObj) {
    $weekDays = [0, 1, 2, 3, 4, 5, 6, 7];
    $script = "";
    for (var i = 0; i < classObj['length']; i++) {
        $daysEnabled = classObj[i]['days'].split(',').map(num => parseInt(num, 10));
        $daysDissabled = $.grep($weekDays, function (el) { return $.inArray(el, $daysEnabled) == '-1' });

        $script = $script + "<script>"
            //onSubmit
            + "$('#form_" + classObj[i]['id'] + "').submit(function() {"
            + "var classId = $('#class_" + classObj[i]['id'] + "').val();"
            + "submitForm(classId);"
            + "});"
            //onChangeDate
            + "$('#date_" + classObj[i]['id'] + "').change(function() {"
            + "$date = $('#date_" + classObj[i]['id'] + "').val();"
            + "$dSelected = $date.substring(0,2);"
            + "$mSelected = $date.substring(3,5);"
            + "$ySelected = $date.substring(6);"
            + "$dateFormated = new Date($mSelected+'\/'+$dSelected+'\/'+$ySelected);"

            + "$today = new Date();"
            + "$dNow = $today.getDate();"
            + "$mNow = $today.getMonth()+1;"
            + "$yNow = $today.getFullYear();"
            + "$today = new Date($mNow+'\/'+$dNow+'\/'+$yNow);"
            + "$options = '';"
            + "$h = new Date().getTime();"
            + "$hourLimit =  new Date($h).getHours()+':'+ new Date($h).getMinutes();"
            + "$hours = ['" + classObj[i]['hours'].split(',') + "'];"

            + "if($today.getTime() == $dateFormated.getTime()){"
            + "for(var j = 0; j < $hours['length']; j++){"
            + "if($hours[j].substring(0,5) > $hourLimit){"
            + "$hour = $hours[j].substring(0,5);"
            + "$options = $options + '<option value='+$hour+'>'+$hours[j]+'</option>';"
            + "}"
            + "};"
            + "}else{"
            + "for(var j = 0; j < $hours['length']; j++){"
            + "$hour = $hours[j].substring(0,5);"
            + "$options = $options + '<option value='+$hour+'>'+$hours[j]+'</option>';"
            + "}"
            + "}"
            + "$('#hour_" + classObj[i]['id'] + "').html($options);"
            + "});"
            //datepicker
            + "$('.datepicker_" + classObj[i]['id'] + "').datepicker({"
            + "language: 'es',";
        if ($daysDissabled.length > 0) {
            $script = $script + "daysOfWeekDisabled: [" + $daysDissabled + "],";
        }
        $script = $script + "autoclose: true,"
            + "startDate: '0',"
            + "endDate: '+14d',"
            + "weekStart: 1,"
            + "format: 'dd-mm-yyyy'"
            + "});"
            + "<\/script>";
    };
    return $script;
};

async function submitForm(classId) {
    $dni = $('#dni_' + classId).val();
    $name = $('#name_' + classId).val();
    $date = $('#date_' + classId).val();
    $hour = $('#hour_' + classId).val();
    $pax = $('#pax_' + classId).val();
    $className = $('#className_' + classId).val();

    var isValidDni = isValidDNI($dni);

    if (isValidDni) {
        var classFull = new Promise((resolve, reject) => {
            jQuery.ajax({
                type: "POST",
                async: false,
                url: 'functions.php',
                dataType: 'json',
                data: { functionName: 'getBookings', date: $date, hour: $hour, dni: $dni, className: $className },

                success: function (obj, textstatus) {
                    if (obj['hasBooking']) {
                        alert("Ya tienes hecha una reserva para esa clase.");
                        resolve(true);
                    } else if (!obj['hasBooking'] && (('error' in obj) || obj.result >= this.$pax)) {
                        alert("Clase completa.");
                        resolve(true);
                    }
                    resolve(('error' in obj) || obj.result >= 10);
                }
            });
        });

        if (!(await classFull)) {
            insertBooking($date, $hour, $name, $dni.toUpperCase(), $className);

            $('form#form_' + classId)[0].reset();
            $('div#form_' + classId).modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            event.preventDefault();
        } else {
            event.preventDefault();
        }
    }
};

function insertBooking(date, hour, name, dni, className) {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'addBooking', date: date, hour: hour, name: name, dni: dni, className: className },

        success: function (obj, textstatus) {
            if (!('error' in obj)) {
                alert("Reserva hecha con exito.");
            } else {
                alert("No se ha podido hacer la reserva.");
                event.preventDefault();
            }
            return;
        },
        error: function (xhr, status, error) {
            alert("No se ha podido hacer la reserva.");
        }
    });
};

function isValidDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if (expresion_regular_dni.test(dni) === true) {
        numero = dni.substr(0, dni.length - 1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length - 1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero + 1);
        if (letra != let) {
            alert('DNI o NIE, la letra no se corresponde');
            return false;
        } else {
            return true;
        }
    } else {
        alert('DNI o NIE erroneo, formato no válido');
        return false;
    }
};

function removeClass(classId) {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'removeClass', classId: classId},

        success: function (obj, textstatus) {
            if (obj['removed']) {
                alert("Clase eliminada.");
            }
            return;
        },
        error: function (xhr, status, error) {
            alert("No se ha podido eliminar la clase.");
        }
    });
};

function removeFighter(fighterId) {
    debugger;
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'removefighter', fighterId: fighterId},

        success: function (obj, textstatus) {
            if (obj['removed']) {
                alert("Competidor eliminado.");
            }
            return;
        },
        error: function (xhr, status, error) {
            alert("No se ha podido eliminar el competidor.");
        }
    });
};

function getDayOfWeek(n) {
    $days = ["Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"];

    return $days[n - 1];
};

function getHoursCms() {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'getHours'},

        success: function (obj, textstatus) {
            return;
        }
    });
};

function cancelBook(bookingId) {
    jQuery.ajax({
        type: "POST",
        async: false,
        url: 'functions.php',
        dataType: 'json',
        data: { functionName: 'cancelBook', bookingId: bookingId },
        success: function (obj, textstatus) {
            if (obj['removed']) {
                alert("Cancelada con exito.");
            } else {
                alert("No se ha podido cancelar.")
            }
        }
    });
};

function loadFighters() {
    jQuery.ajax({
        type: "POST",
        url: 'functions.php',
        data: { functionName: 'getFighters' },
        success: function (obj, textstatus) {
            $fighters = obj["result"];

            $('div.fightersModals').html(getFighterModal($fighters));
            $('div.fightersPage').html(getFightersForHtml($fighters));
        },
        error: function (xhr, status, error) {
            alert("No se ha podido conectar con los competidores.");
        }
    });
};

function getFighterModal(classObj) {
    $modals = "";
    for (var i = 0; i < classObj['length']; i++) {
        $modals = $modals + '<div class="modal" id="fighter_' + classObj[i]['id'] + '">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<h4 class="modal-title">Fighter</h4>'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '</div>'
            + '<div class="modal-body">'
            + '<p><b>Nombre: </b>' + classObj[i]['name'] + '</p>'
            + '<p><b>Alias: </b>' + classObj[i]['nick'] + '</p>'
            + '<p><b>Edad: </b>' + classObj[i]['age'] + '</p>'
            + '<p><b>Peso: </b>' + classObj[i]['weight'] + ' Kg</p>'
            + '<p><b>Combates: </b>G: ' + classObj[i]['win'] + ' / P: ' + classObj[i]['lose'] + ' / N: ' + classObj[i]['nul'] + ' / KO: ' + classObj[i]['ko'] + '</p>'
            + '<p>' + classObj[i]['description'] + '</p>'
            + '</div>'
            + '<!-- Modal footer -->'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
    };
    return $modals;
};

function getFightersForHtml(data) {
    $html = '';
    for (var i = 0; i < data['length']; i++) {

        if (data[i]['picture']['length'] > 0) {
            $image = data[i]['picture'];
        } else {
            $image = "images/jm_name_logo_small.png";
        }

        $html = $html + '<div class="col-md-4 ministry" data-toggle="modal" data-target="#fighter_' + data[i]['id'] + '">'
            + '<div class="img" style="background-image: url(' + $image + ');"></div>'
            + '<div class="text p-4">'
            + '<h2 class="mb-4">' + data[i]['name'] + ' - ' + data[i]['nick'] + '</h2>'
            + '<hr />'
            + '<p><b>Edad: </b>' + data[i]['age'] + '</p>'
            + '<p><b>Peso: </b>' + data[i]['weight'] + ' Kg</p>'
            + '<p><b>Combates: </b>G: ' + data[i]['win'] + ' / P: ' + data[i]['lose'] + ' / N: ' + data[i]['nul'] + ' / KO: ' + data[i]['ko'] + '</p>'
            + '</div>'
            + '</div>';
    };
    return $html;
};

$.ajax({
    url: 'footer.html',
    type: 'GET',
    dataType: 'html',
    success: function (data) {
        $('.footer .container').html(data);
    }
});

	//Страница Главная
	function app_main() {
		$.ajax({
			url: "main/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}
	
	//Страница Аутентификация
	function app_authentication() {
		$.ajax({
			url: "authentication/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}
	
	//Страница Регистрация
	function app_registration() {
		$.ajax({
			url: "registration/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}

	//Страница Личный кабинет
	function app_personalArea() {
		$.ajax({
			url: "personalarea/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}
			
	//Страница Выбор рейса
	function app_selectionflight() {
		$.ajax({
			url: "selectionflight/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}
	
	//Страница Бронирование
	function app_booking() {
		$.ajax({
			url: "booking/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}

	//Страница Управление бронированиями
	function app_bookingManagement() {
		$.ajax({
			url: "bookingmanagement/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}


	//Функция перехода на страницу выбора места
	function goToSeatSelection() {
		// Если пассажиры есть
		if (booking.passengers.length != 0) {
			$.ajax({
				url: "seatselection/index.html",
				success: function(data) {
					$("#app").html(data);
				}
			});
		// Если нету
		} else {
			alert("Добавьте пассажиров на рейс");
		}
	}

	//Функция перехода на страницу управления бронированиями
	function goToBookingManagement() {
		// Присваивание всех мест нет данных
		for (var i = 0; i < booking.passengers.length; i++) {
			booking.passengers[i].place = "нет данных";
		}
		// Очищение массива занятых мест
		booking.reserved = [];
		$.ajax({
			url: "bookingmanagement/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}

	//Функция перехода на страницу бронирования
	function goToBooking() {
		$.ajax({
			url: "booking/index.html",
			success: function(data) {
				$("#app").html(data);
			}
		});
	}

 	//------------------------------//
	//Запрос для выбора места
	function ajax_selectSeat(document_number, i, type) {
		// Вызов функции выбора места в самолёте
		choisePassengerPlace(document_number);

		// Составление объекта отправляемого серверу
		var js = {
			"passenger": document_number,
			"seat": booking.passengers[i].place,
			"type": type
		};

		// Ajax запрос выбора места
		$.ajax({
			url: "server/server.php", // путь
			type: "POST", // "PATCH" // метод отправки данных
			contentType: "application/json", // тип отправляемых данных
			data: js, // отправляемые данные
			// Перед отправкой
			beforeSend: function() {
				console.log("beforeSend");
				console.log(js);
			},
			// В случае успеха
			success: function(data) {
				console.log("Success");
				console.log(js);
			},
			// В случае неудачи
			error: function(jqXHR) {
				data = JSON.parse(jqXHR.responseText);
				out = `
					<h2>Ошибка ${jqXHR.status}</h2>
					<p>${jqXHR.responseText}</p>
				`;
				$("#response").append(out);
			}
		});
	}

 	//------------------------------//
	//Запрос для регистрации
	function ajax_registrationUser() {
		// Составление объекта отправляемого серверу
		var js = {
			"first_name": booking.user.first_name,
			"last_name": booking.user.second_name,
			"phone": booking.user.phone,
			"document_number": booking.user.document_number,
			"password": booking.user.password,
		};

		// Ajax запрос регистрации пользователя
		$.ajax({
			url: "server/server.php", // путь
			type: "POST", // метод отправки данных
			contentType: "application/json", // тип отправляемых данных
			data: js, // отправляемые данные
			// Перед отправкой
			beforeSend: function() {
				console.log("beforeSend");
				console.log(js);
			},
			// В случае успеха
			success: function(data) {
				console.log("Success");
				console.log(js);
			},
			// В случае неудачи
			error: function(jqXHR) {
				data = JSON.parse(jqXHR.responseText);
				out = `
					<h2>Ошибка ${jqXHR.status}</h2>
					<p>${jqXHR.responseText}</p>
				`;
				$("#response").append(out);
			}
		});

	}


 	//------------------------------//
	//Запрос для Аутентификации
	function ajax_authentication(form) {
		// Составление объекта отправляемого серверу
		var js = {
			"phone": form.elements["phone"].value,
			"password": form.elements["password"].value,
		};

		// Ajax запрос на аутентификация
		$.ajax({
			url: "server/server.php", // путь
			type: "POST", // метод
			contentType: "application/json", // тип
			data: js, // данные
			// Перед отправкой
			beforeSend: function() {
				console.log("beforeSend");
				console.log(js);
			},
			// В случае успеха
			success: function(data) {
				console.log("Success");
				console.log(js);
			},
			// В случае неудачи
			error: function(jqXHR) {
				data = JSON.parse(jqXHR.responseText);
				out = `
					<h2>Ошибка ${jqXHR.status}</h2>
					<p>${jqXHR.responseText}</p>
				`;
				$("#response").append(out);
			}
		});

		return;
	}
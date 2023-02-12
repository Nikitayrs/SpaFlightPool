	//Аутентификация
	function submitFormAuthentication() {
		event.preventDefault();
		console.log(booking.user);

		// Получение данных формы
		var form = document.forms["form_authentication"];

		// Проверка телефона и пароля на совпадение с пользователем
		if (form.elements["phone"].value != booking.user.phone || form.elements["password"].value != booking.user.password) {
			alert("Заполните поля \"Телефон\" и \"Пароль\" зарегистрированными данными");
			return;
		}
		
		// Вызов функции с ajax запросом на авторизацию
		ajax_authentication(document.forms["form_authentication"]);

		// Сообщение о входе
		alert("Вы вошли");

		// Вызов функции 
		app_personalArea();
	}
	
	//Событие нажатия на кнопку отправки формы, добавляющий нового пассажира
	function submitFormPassengers() {
		event.preventDefault();
		
		// Создание объекта пассажира
		var passenger = {};
		
		// Получение данных формы
		var form = document.forms["form_passengers"];

		// Запись данных в объект
		passenger.first_name = form.elements["first_name"].value;
		passenger.second_name = form.elements["second_name"].value;
		passenger.birth_date = form.elements["birth_date"].value;
		passenger.place = "Нет данных";
		passenger.document_number = form.elements["document_number"].value;

		// Проверка наличия имени, фамилии, номера докумена
		if(passenger.first_name == "" || passenger.second_name == "" || passenger.document_number == "") {
			alert("Заполните обязательные поля \"Имя\", \"Фамилия\" и \"Номер документа\"");
			return;
		}

		// Очистка полей ввода
		var clr = document.querySelectorAll(".clear");
		for(var i = 0; i < clr.length; i++) {
			clr[i].value = "";
		}

		// Добавление в массив пассажиров объект пассажира
		booking.passengers.push(passenger);
		
		// Вызов функции вывода таблицы пассажиров
		createTablePassengers();
	};

	//Добавление пользователя
	function submitFormRegistration() {
		event.preventDefault();

		// Если данные авторизованного пользователя уже есть
		if (booking.user.first_name != undefined) {
			alert("Вы уже зарегистрировались");
			return;
		}

		// Получение данных формы
		var form = document.forms["form_user"];

		// Запись данных в объект
		booking.user.first_name = form.elements["first_name"].value;
		booking.user.second_name = form.elements["second_name"].value;
		booking.user.phone = form.elements["phone"].value;
		booking.user.birth_date = form.elements["birth_date"].value;
		booking.user.document_number = form.elements["document_number"].value;
		booking.user.password = form.elements["password"].value;

		// Вызов функции с ajax запросом регистрации пользователя
		ajax_registrationUser();

		// Добавление зарегистрированного пользователя в массив пассажиров
		booking.passengers.push(booking.user);

		// Сообщение об успешной регистрации
		alert("Вы успешно зарегистрировались");
	};

	//Запись выбранного бронирования
	function inputRadioButtonClick() {
		// Получение полёта туда
		var val_to = $("input:radio[name='flights_to']:checked").val();
		// Получение полёта обратно
		var val_back = $("input:radio[name='flights_back']:checked").val();
		
		// Вызов функции создания бронирования
		createBooking("flights_to", val_to);
		// Вызов функции создания бронирования
		createBooking("flights_back", val_back);
	};


	//Функция удаления пассажиров при нажатии на ссылку удаление
	function deleteTableRow(document_number) {
		// Если количество пассажиров не равно 1
		if(booking.passengers.length != 1) {
			event.preventDefault();
			// Удаление строки в таблице пассажиров
			$(event.target).closest("tr").remove();
			// Цикл удаления
			for(var i = 0; i < booking.passengers.length; i++) {
				// Если пассажир соответствует данным для удаления
				if (booking.passengers[i].document_number == document_number) {
					// Удаление пассажира из массива
					booking.passengers.splice(i, 1);
					// Вывод сообщения об успешном удалении
					alert("Пассажир удалён");
					// Прерывание исполнения кода
					return;
				}
			}
		}
	}
	
	// Функция записи выбранного рейса
	function createBooking(direct, id) {
		// Цикл прогона по всем рейсам
		for (var i = 0; i < booking.data[direct].length; i++) {
			// Если рейса соответствует данным для добавления
			if (booking.data[direct][i].flight_code == id) {
				// Добавление рейса в бронирование
				booking[direct] = booking.data[direct][i];
				// Прерывание исполнения кода
				return;
			} 
		}	
	}

	//Функция выбора места в самолёте
	function choisePassengerPlace(document_number) {
		// Выбор места
		var place = prompt("Выберите место");
		// Если место не занято
		if($(".seat td#" + place).not(".select").length) {
			// Добавляем класс
			$(".seat td#" + place).addClass("select");

			// Цикл перебора пассажиров
			for(var i = 0; i < booking.passengers.length; i++) {
				// Если пассажир соответствует данным для добавления места
				if(booking.passengers[i].document_number == document_number) {
					// Добавление места пассажиру
					booking.passengers[i].place = place;
					// Перезапись таблицы выбора мест
					createTableSeatSelection();
					// Прерывание исполнения кода
					break;
				}
			}

			// Вызов функции вывода таблицы пассажиров
			createTablePassengers();
		// Если место занято
		} else {
			// Вывод сообщения об ошибке
			alert("Вы выбрали не существующее или забронированное место");
		}
	}

	//Расчёт общего времени полёта
	function totalTimeCalculation(arr_flights, i) {
		// Получение даты первого рейса
		var data1 = new Date(arr_flights[i].from.date + "," + arr_flights[i].from.time);
		// Преобразование в миллисекунды
		data1 = Date.parse(data1);

		// Получение даты второго рейса
		var data2 = new Date(arr_flights[i].to.date + "," + arr_flights[i].to.time);
		// Преобразование в миллисекунды
		data2 = Date.parse(data2);

		// Получение разницы в миллисекундах
		time = data2 - data1;

		// Преобразование миллисекунд в минуты
		minutes = parseInt((time / (1000 * 60)) % 60),
		// Преобразование миллисекунд в часы
		hours = parseInt((time / (1000 * 60 * 60)) % 24);

		// Конкатинация данных времени полёта
		arr_flights[i].result = hours + ":" + minutes;
	}

	//Функция очищающая всю сессию под чистую
	function logout() {
		// Очищение объекта booking
		booking = {};
		// Очищение объекта flights_to
		booking.flights_to = {};
		// Очищение объекта flights_back
		booking.flights_back = {};
		// Очищение массива passengers
		booking.passengers = [];
		// Очищение строки allcost
		booking.allcost = "";
		// Очищение объекта user
		booking.user = {};
		// Вызов функции вывода страницы поиска
		app_main();
	}
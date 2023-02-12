	// Функция вывода формы поиска
	function createFormMain() {
		// Запись данных
		out = `
			<form>
				<p>Откуда: <br />
				<input class = "clear" type = "text"></input> </p>
				<p>Куда: <br />
				<input class = "clear" type = "text"></input> </p>
				<p>Туда: <br />
				<input class = "clear" type = "text"></input> </p>
				<p>Обратно: <br />
				<input class = "clear" type = "text"></input> </p>
				<p>Количество пассажиров(от 1 до 8): <br />
				<input class = "clear" type = "text"></input> </p>
			</form>

			<input type = "button" class = "btt" onclick = "app_selectionflight()" value = "Search" /> <br /> 
			<input type = "button" class = "btt" onclick = "app_authentication()" value = "Personal area" />
		`; // app_selectionflight() хранится в appgoto.js
		// Вывод данных
		$("#response").html(out);
	}

	// Функция вывода формы аутентификации
	function createFormAuthentication() {
		// Запись данных
		out = `
			<form id = "form_authentication">
				<p>Телефон: <br />
				<input type = "text" class = "clear" name = "phone" /></p>
				<p>Пароль: <br />
				<input type = "text" class = "clear" name = "password" /></p>
				<input type = "submit" class = "btt" value = "Log in" onclick = "return submitFormAuthentication();" />
			</form>
			<input type = "button" class = "btt" value = "Sign up" onclick = "app_registration()"/>
		`;
		// Вывод данных
		$("#response").html(out);
	}

	// Функция вывода формы добавления пассажиров
	function createFormPassengers() {
		// Запись данных
		out = `
			<form id = "form_passengers">
				<br />
				<p>Имя:*<br />
				<input type = "text" class = "clear" name = "first_name" /></p>
				<p>Фамилия:*<br />
				<input type = "text" class = "clear" name = "second_name" /></p>
				<p>Дата рождения:<br />
				<input type = "text" class = "clear" name = "birth_date" /></p>
				<p>Номер документа:*<br />
				<input type = "text" class = "clear" name = "document_number" /></p>
				<input  type = "submit" class = "btt" value = "Добавить" onclick = "return submitFormPassengers();"/>
			</form> <br />
			<input type = "button" class = "btt" value = "Back" onclick = "app_selectionflight()" />
			<input type = "button" class = "btt" value = "Confirm" onclick = "app_bookingManagement()" />
		`;
		// Вывод данных
		$("#response").append(out);
	}

	// Функция вывода формы регистрации
	function createFormRegistration() {
		// Запись данных
		out = `
			<form id = "form_user" onsubmit = "return submitFormRegistration();">
				<p>Имя:* <br />
				<input type = "text" class = "clear" name = "first_name" required /> </p>
				<p>Фамилия:* <br />
				<input type = "text" class = "clear" name = "second_name" required /> </p>
				<p>Телефон*: <br />
				<input type = "text" class = "clear" name = "phone" required /> </p>
				<p>Дата рождения: <br />
				<input type = "text" class = "clear" name = "birth_date" /> </p>
				<p>Номер документа:* <br />
				<input type = "text" class = "clear" name = "document_number" required /> </p>
				<p>Пароль:* <br />
				<input type = "text" class = "clear" name = "password" required /> </p>
				<input type = "submit" class = "btt" value = "Register now" />
			</form>
			<input type = "button" class = "btt" value = "Log in" onclick = "app_authentication()"/>
		`;
		// Вывод данных
		$("#response").append(out);
	}

	// Функция вывода кнопок
	function createButtonBookingManagement() {
		// Запись данных
		out = `
			<input type = "button" class = "btt" value = "Home" onclick = "app_main()" />
			<input type = "button" class = "btt" value = "Select seat" onclick = "goToSeatSelection()" />
		`;
		// Вывод данных
		$("#response").append(out);
	};

	// Функция вывода кнопок
	function createButtonSelectionFlight() {
		// Запись данных
		out = `
			<input type = "button" class = "btt" value = "Back" onclick = "app_main()" />
			<input type = "button" class = "btt" value = "Go to Booking"  onclick = "app_booking()" />
		`;
		// Вывод данных
		$("#response").append(out);
	}

	// Вывод страницы личного кабинета
	function createPersonalAreaHtml() {
		// Проверка на не помню уже что
		var bd = (booking.user.birth_date == "" || booking.user.birth_date == undefined) ? "Информация отсутствует" : booking.user.birth_date;

		// Добавление пользователя в массив пассажиров, причём самым первым элементом
		// зачем первым элементом?
		booking.passengers[0] = booking.user;
		
		// Запись данных
		out = `
			<h2>Добро пожаловать ${booking.user.first_name} ${booking.user.second_name}</h2>
			<p>Дата рождения: ${booking.user.birth_date} </p>
			<p>Номер документа: ${booking.user.document_number} </p>
			<p>Телефон: ${booking.user.phone} </p>
			<p>Пароль: ${booking.user.password} </p>
			<input type = "button" class = "btt" value = "Search" onclick = "app_selectionflight();" /> <br />
			<input type = "button" class = "btt" value = "Logout" onclick = "logout();" />
		`;
		// Вывод данных
		$("#response").html(out);
	}

	// Вывод избранных, прошедших и предстоящих рейсов
	function createPersonalAreaFlights() {
		out = `<h2>Избранные рейсы</h2>`;
		if(booking.flights_to.flight_id == undefined) out += "<p>Данные отсутствуют</p>";
		else out += `
			<table>
				<tr>
					<th>Город вылета</th>
					<th>Город прибытия</th>
					<th>Время отправления</th>
					<th>Время прибытия</th>
				</tr>
				<tr>
					<td>${booking.flights_to.from.city}</td>
					<td>${booking.flights_to.to.city}</td>
					<td>${booking.flights_to.from.time} ${booking.flights_to.from.date}</td>
					<td>${booking.flights_to.to.time} ${booking.flights_to.to.date}</td>
				</tr>
				<tr>
					<td>${booking.flights_back.from.city}</td>
					<td>${booking.flights_back.to.city}</td>
					<td>${booking.flights_back.from.time} ${booking.flights_back.from.date}</td>
					<td>${booking.flights_back.to.time} ${booking.flights_back.to.date}</td>
				</tr>
			</table>
			<input type = "button" class = "btt" value = "Book now"  onclick = "app_booking()" />
			<input type = "button" class = "btt" value = "Remove from favorites" />
		`;
		out += `<h2>Прошедшие рейсы</h2>`;
		if(booking.flights_to.flight_id == undefined) out += "<p>Данные отсутствуют</p>";
		else out += `
			<table>
				<tr>
					<th>Номер рейса</th>
					<th>Город вылета</th>
					<th>Город прибытия</th>
					<th>Время отправления</th>
					<th>Время прибытия</th>
				</tr>
				<tr>
					<td>${booking.flights_to.flight_code}</td>
					<td>${booking.flights_to.from.city}</td>
					<td>${booking.flights_to.to.city}</td>
					<td>${booking.flights_to.from.time} ${booking.flights_to.from.date}</td>
					<td>${booking.flights_to.to.time} ${booking.flights_to.to.date}</td>
				</tr>
				<tr>
					<td>${booking.flights_back.flight_code}</td>
					<td>${booking.flights_back.from.city}</td>
					<td>${booking.flights_back.to.city}</td>
					<td>${booking.flights_back.from.time} ${booking.flights_back.from.date}</td>
					<td>${booking.flights_back.to.time} ${booking.flights_back.to.date}</td>
				</tr>
			</table>
			<input type = "button" class = "btt" value = "Add to favorites" />
		`;
		out += `<h2>Предстоящие рейсы</h2>`;
		if(booking.flights_to.flight_id == undefined) out += "<p>Данные отсутствуют</p>";
		else out += `
			<table>
				<tr>
					<th>Код бронирования</th>
					<th>Дата вылета</th>
					<th>Время вылета</th>
					<th>Время прилёта</th>
					<th>Откуда</th>
					<th>Куда</th>
				</tr>
				<tr>
					<td>${booking.flights_to.flight_code}</td>
					<td>${booking.flights_to.from.date}</td>
					<td>${booking.flights_to.from.time} ${booking.flights_to.from.date}</td>
					<td>${booking.flights_to.to.time} ${booking.flights_to.to.date}</td>
					<td>${booking.flights_to.from.city}</td>
					<td>${booking.flights_to.to.city}</td>
				</tr>
				<tr>
					<td>${booking.flights_back.flight_code}</td>
					<td>${booking.flights_back.from.date}</td>
					<td>${booking.flights_back.from.time} ${booking.flights_back.from.date}</td>
					<td>${booking.flights_back.to.time} ${booking.flights_back.to.date}</td>
					<td>${booking.flights_back.from.city}</td>
					<td>${booking.flights_back.to.city}</td>
				</tr>
			</table>
		`;
		$("#response").append(out);
	}

	//Функция создания таблицы мест в рейсе
	function createTableSeatSelection() {
		// Запись данных
		out = `
			<h2>Места в самолёте</h2>
			<table class = "seat">
				<tr>
					<td id = "a1">a1</td>
					<td id = "b1">b1</td>
					<td id = "d1">d1</td>
					<td id = "c1">c1</td>
					<td id = "e1">e1</td>
					<td id = "f1">f1</td>
					<td id = "g1">g1</td>
					<td id = "h1">h1</td>
					<td id = "i1">i1</td>
					<td id = "j1">j1</td>
				</tr>
				<tr>
					<td id = "a2">a2</td>
					<td id = "b2">b2</td>
					<td id = "d2">d2</td>
					<td id = "c2">c2</td>
					<td id = "e2">e2</td>
					<td id = "f2">f2</td>
					<td id = "g2">g2</td>
					<td id = "h2">h2</td>
					<td id = "i2">i2</td>
					<td id = "j2">j2</td>
				</tr>
				<tr><td colspan = "10"></td></tr>
				<tr>
					<td id = "a3">a3</td>
					<td id = "b3">b3</td>
					<td id = "d3">d3</td>
					<td id = "c3">c3</td>
					<td id = "e3">e3</td>
					<td id = "f3">f3</td>
					<td id = "g3">g3</td>
					<td id = "h3">h3</td>
					<td id = "i3">i3</td>
					<td id = "j3">j3</td>
				</tr>
				<tr>
					<td id = "a4">a4</td>
					<td id = "b4">b4</td>
					<td id = "d4">d4</td>
					<td id = "c4">c4</td>
					<td id = "e4">e4</td>
					<td id = "f4">f4</td>
					<td id = "g4">g4</td>
					<td id = "h4">h4</td>
					<td id = "i4">i4</td>
					<td id = "j4">j4</td>
				</tr>
			</table>
			<input type = "button" class = "btt" value = "Back" onclick = "goToBookingManagement()" />
			<input type = "button" class = "btt" value = "Confirm" onclick = "app_bookingManagement()" />
		`;
		// Вывод данных
		$("#seat").html(out);
		// Присваивание классов занятым местам, чтобы подсвечивались
		for(var i = 0; i < booking.passengers.length; i++) {
			$(".seat td#" + booking.passengers[i].place).addClass("select");
		}
	}

	//Глобальная функция создания таблицы пассажиров
	function createTablePassengers() {
		let place = "";
		// Начало записи данных
		out = `
			<h2>Пассажиры</h2>
			<table>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Фамилия</th>
						<th>Дата рождения</th>
						<th>Номер документа</th>
						<th>Место</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
		`;

		// Если пассажиры есть
		if (booking.passengers.length != 0) {
			// Цикл работы с пассажирами
			for (var i = 0; i < booking.passengers.length; i++) {
				place = (booking.passengers[i].place == undefined) ? "нет данных" : booking.passengers[i].place;
				// Если активная страница Бронирование
				if (active_page == "booking") {
					act = `<a onclick = "deleteTableRow(${booking.passengers[i].document_number});">Удалить</a>`;
				// Если активная страница Выбор места
				} else if (active_page == "seatselection") {
					act = `<a onclick = "ajax_selectSeat(${booking.passengers[i].document_number}, ${i}, ${i});">Выбор места</a>`;
				// Если иные активные страницы
				} else {
					act = `Отсутствует`;
				}
				// Продолжение записи данных
				out += `<tr>
							<td>${booking.passengers[i].first_name}</td>
							<td>${booking.passengers[i].second_name}</td>
							<td>${booking.passengers[i].birth_date}</td>
							<td>${booking.passengers[i].document_number}</td>
							<td>${place}</td>
							<td>${act}</td>
						</tr>`;
			}
		}
		// Продолжение записи данных
		out += `
			</tbody>
		</table>
		`;

		// Вывод данных
		$("#passengers").html(out);
	}

	// Функция вывода обьекта data в таблицу
	function outTableFlight(arr_flights, id) {
		// Если активная страница Выбор рейса
		if(active_page == "selectionflight") {
			act = `<th>Выбор рейса</th>`;
		// Если остальные
		} else {
			act = "";
		}
		// Голова
		var cup = (id == "flights_to") ? "Туда" : "Обратно";
		// Запись данных
		out = `
			<h2>${cup}</h2>
			<table id = ${id}>
				<thead>
					<tr>
						<th>Код</th>
						<th>Город</th>
						<th>Аэропорт</th>
						<th>iata</th>
						<th>Дата</th>
						<th>Время</th>
						<th>Город</th>
						<th>Аэропорт</th>
						<th>iata</th>
						<th>Дата</th>
						<th>Время</th>
						<th>Цена</th>
						<th>Доступность</th>
						<th>Время полёта</th>
						${act}
					</tr>
				</thead>
				<tbody>`;
		// Цикл вывода рейсов, вроде
		for(var i = 0; i < arr_flights.length; i++) {
			// Вызов функции расчёта времени полёта
			totalTimeCalculation(arr_flights, i);

			// Если активная страница Выбор рейса
			if(active_page == "selectionflight") {
				act = `<td><input type = "radio" name = "${id}" value = "${arr_flights[i].flight_code}" onclick = "inputRadioButtonClick();" /></td>`;
			// Если остальные
			} else {
				act = "";
			}
			// Продолжение записи данных
			out += `
					<tr>
						<td>${arr_flights[i].flight_code}</td>
						<td>${arr_flights[i].from.city}</td>
						<td>${arr_flights[i].from.airport}</td>
						<td>${arr_flights[i].from.iata}</td>
						<td>${arr_flights[i].from.date}</td>
						<td>${arr_flights[i].from.time}</td>
						<td>${arr_flights[i].to.city}</td>
						<td>${arr_flights[i].to.airport}</td>
						<td>${arr_flights[i].to.iata}</td>
						<td>${arr_flights[i].to.date}</td>
						<td>${arr_flights[i].to.time}</td>
						<td>${arr_flights[i].cost}</td>
						<td>${arr_flights[i].availability}</td>
						<td>${arr_flights[i].result}</td>
						${act}
						
					</tr>
			`;
		}
			
		// Продолжение записи данных
		out += `</tbody></table>`;
		
		// Вывод данных
		$("#flights").append(out);
	}
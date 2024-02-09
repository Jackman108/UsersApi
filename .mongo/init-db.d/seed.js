//.mongo/init-db.d/seed.js

db.users.drop();
db.positions.drop();

function generateId() {
	return new ObjectId()
		.toString()
		.replace('ObjectId("', '')
		.replace('")', '');
}

devsId = generateId();
buhId = generateId();
salesId = generateId();

db.positions.insertMany([
  {
    _id: devsId,
    name: 'Разработчик',
	defaultSalary: 150000
  },
  {
    _id: buhId,
    name: 'Бухгалтер',
	defaultSalary: 40000
  },
  {
    _id: salesId,
    name: 'Менеджер по продажам',
	defaultSalary: 60000
  },
]);

db.users.insertMany([
  {
    _id: generateId(),
    name: 'Михаил',
	positionId: devsId,
	login: 'michael1'
  },
  {
    _id: generateId(),
    name: 'Алексей',
	positionId: devsId,
	login: 'alex'
  },
  {
    _id: generateId(),
    name: 'Ирина',
	positionId: devsId,
	login: 'ira'
  },
  {
    _id: generateId(),
    name: 'Алевтина',
	positionId: buhId,
	login: 'aleya'
  },
  {
    _id: generateId(),
    name: 'Ольга',
	positionId: buhId,
	login: 'olga'
  },
  {
    _id: generateId(),
    name: 'Иракли',
	login: 'irakli',
	positionId: salesId,
  },
  {
    _id: generateId(),
    name: 'Зарина',
	login: 'zarina',
	positionId: salesId,
  },
  {
    _id: generateId(),
    name: 'Олег',
	login: 'oleg',
	positionId: salesId,
  },
])
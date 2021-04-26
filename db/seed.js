const { Users, Topics, Questions } = require('../models/index.model');
const { dbConnect, dbDisconnect } = require('./db');

dbConnect();

const seedAll = async () => {
  // await Users.deleteMany();
  await Topics.deleteMany();
  await Questions.deleteMany();

  // await Users.create({
  //   username: 'test',
  //   password: 'test',
  // });

  const animalsT = await Topics.create({
    title: 'Животные',
  });
  const fairyTalesT = await Topics.create({
    title: 'Сказки',
  });
  const harryPotterT = await Topics.create({
    title: 'Гарри Поттер',
  });
  const geographyT = await Topics.create({
    title: 'География',
  });
  const proverbsT = await Topics.create({
    title: 'Пословицы / Поговорки',
  });
  const sportT = await Topics.create({
    title: 'Спорт',
  });
  const plantsT = await Topics.create({
    title: 'Растения',
  });

  const animals = [
    {
      title: 'Кого в старину на Руси называли вепрем?',
      answer: 'Кабана',
      price: 100,
      topic: animalsT._id,
    },
    {
      title: 'Как уважительно прозвали бурого медведя жители Сибири?',
      answer: 'Хозяин тайги',
      price: 200,
      topic: animalsT._id,
    },
    {
      title: ' Кого в русских сказках называют Топтыгин?',
      answer: 'Медведя',
      price: 300,
      topic: animalsT._id,
    },
    {
      title: ' Мехом какого животного отделана шапка Мономаха?',
      answer: 'Соболь',
      price: 400,
      topic: animalsT._id,
    },
    {
      title: ' Кого новосёлы, по нашей традиции, первым запускают в новый дом?',
      answer: 'Кошку',
      price: 500,
      topic: animalsT._id,
    },
    {
      title: ' Как называется жилище волка?',
      answer: 'Логово',
      price: 600,
      topic: animalsT._id,
    },
    {
      title: ' Разновидность какой из этих ящериц является крупнейшей в мире?',
      answer: 'Варан',
      price: 700,
      topic: animalsT._id,
    },
  ];

  await Questions.insertMany(animals);

  const fairyTale = [
    {
      title: 'Как называют еду в русских сказках',
      answer: 'яство',
      price: 100,
      topic: fairyTalesT._id,
    },
    {
      title: 'Какие ножки бывают у избушки в русских сказках?',
      answer: 'Курьи',
      price: 200,
      topic: fairyTalesT._id,
    },
    {
      title: ' Какая волшебная скатерть встречается в русских сказках?',
      answer: 'Самобранка',
      price: 300,
      topic: fairyTalesT._id,
    },
    {
      title: ' Какой подарок ко дню рождения Сова подарила ослику Иа?',
      answer: 'Хвост',
      price: 400,
      topic: fairyTalesT._id,
    },
    {
      title: ' На чем летал барон Мюнхгаузен?',
      answer: 'На ядре',
      price: 500,
      topic: fairyTalesT._id,
    },
    {
      title: ' Два каких гуся жили у бабуси?',
      answer: 'Веселых',
      price: 600,
      topic: fairyTalesT._id,
    },
    {
      title: ' Назовите фамилию почтальона из Простоквашино',
      answer: 'Печкин',
      price: 700,
      topic: fairyTalesT._id,
    },
  ];

  const harryPotter = [
    {
      title:
        'Какое имя дали гипогрифу Клювокрылу, дабы Министерство Магии не догадалось, что он именно тот сбежавший гипогриф?',
      answer: 'Махаон',
      price: 100,
      topic: harryPotterT._id,
    },
    {
      title:
        'Какое заклинание сказал Гарри, чтобы Снегг не смог ещё раз попасть в его воспоминания?',
      answer: 'Протего',
      price: 200,
      topic: harryPotterT._id,
    },
    {
      title: 'Какой патронус у МакГонагалл?',
      answer: 'Кошка',
      price: 300,
      topic: harryPotterT._id,
    },
    {
      title: 'Какой патронус у Чжоу Чанг?',
      answer: 'Лебедь',
      price: 400,
      topic: harryPotterT._id,
    },
    {
      title: 'Как звали оборотня, который напал на Билла Уизли?',
      answer: 'Сивый',
      price: 500,
      topic: harryPotterT._id,
    },
    {
      title: 'Кто старше Гарри Поттер или Рон Уизли?',
      answer: 'Рон',
      price: 600,
      topic: harryPotterT._id,
    },
    {
      title: 'Кто всезнайка?',
      answer: 'Гермиона',
      price: 700,
      topic: harryPotterT._id,
    },
  ];

  const geography = [
    {
      title: 'Как иначе называют Нидерланды?',
      answer: 'Голландия',
      price: 100,
      topic: geographyT._id,
    },
    {
      title: 'Как назывались поселенцы на неосвоенных землях Америки?',
      answer: 'Пионеры',
      price: 200,
      topic: geographyT._id,
    },
    {
      title:
        'В каком городе находилось одно из семи чудес света Сады Семирамиды??',
      answer: 'Вавилон',
      price: 300,
      topic: geographyT._id,
    },
    {
      title:
        'В каком южноамериканском городе стоит 38-метровая статуя Иисуса Христа?',
      answer: 'Рио-де-Жанейро',
      price: 400,
      topic: geographyT._id,
    },
    {
      title:
        'Кто собирался открыть Индию, а открыл Америку?',
      answer: 'Христофор Колумб',
      price: 500,
      topic: geographyT._id,
    },
    {
      title:
        'Какое из этих названий улиц не вошло в российский обиход?',
      answer: 'Авеню',
      price: 600,
      topic: geographyT._id,
    },
    {
      title:
        'Что такое Тигр и Евфрат?',
      answer: 'Реки',
      price: 700,
      topic: geographyT._id,
    },
  ];
  const proverbs = [
    {
      title: 'Какое слово пропущено в русской пословице «седина в бороду-... в ребро»?',
      answer: 'Бес',
      price: 100,
      topic: proverbsT._id,
    },
    {
      title: 'Что русская пословица призывает беречь с молоду?',
      answer: 'Честь',
      price: 200,
      topic: proverbsT._id,
    },
    {
      title: 'О смелом,благородном человеке говорят: «Рыцарь без...»',
      answer: 'Страха и упрека',
      price: 300,
      topic: proverbsT._id,
    },
    {
      title: 'Кого во всем мире называют «Цюрихскими гномами»?',
      answer: 'Банкиров',
      price: 400,
      topic: proverbsT._id,
    },
    {
      title: 'Чем, согласно русской пословице, красна изба?',
      answer: 'Пирогами',
      price: 500,
      topic: proverbsT._id,
    },
    {
      title: 'Кому, согласно латинской пословице, не дозволено то, что дозволено Юпитеру?',
      answer: 'Быку',
      price: 600,
      topic: proverbsT._id,
    },
    {
      title: 'Как называют злую, сварливую женщину?',
      answer: 'Фурия',
      price: 100,
      topic: proverbsT._id,
    },
  ];
  const sport = [
    {
      title: 'Какой спортивный термин означает нарушение правил в ходе игры?',
      answer: 'Фол',
      price: 100,
      topic: sportT._id,
    },
    {
      title: 'В какой из этих игр используется мяч наибольшей величины?',
      answer: 'Баскетбол',
      price: 200,
      topic: sportT._id,
    },
    {
      title: 'В каком виде спорта разыгрывается Кубок Кремля?',
      answer: 'Теннис',
      price: 300,
      topic: sportT._id,
    },
    {
      title: 'Чем бьют по мячу игроки в гольф?',
      answer: 'Клюшкой',
      price: 400,
      topic: sportT._id,
    },
    {
      title: 'Какой легкоатлетический снаряд спортсмены толкают?',
      answer: 'Ядро',
      price: 500,
      topic: sportT._id,
    },
    {
      title: 'В какой стране впервые появилась игра в гольф?',
      answer: 'Шотландия',
      price: 600,
      topic: sportT._id,
    },
    {
      title: 'Как называется обувь для футболиста?',
      answer: 'Бутсы',
      price: 700,
      topic: sportT._id,
    },
  ]
  const plants = [
    {
      title: 'Какое растение называют "дикой розой"?',
      answer: 'Шиповник',
      price: 100,
      topic: plantsT._id,
    },
    {
      title: 'Что является плодом дынного дерева?',
      answer: 'Папайя',
      price: 200,
      topic: plantsT._id,
    },
    {
      title: 'Розы какой окраски издают самый сильный запах?',
      answer: 'Белые',
      price: 300,
      topic: plantsT._id,
    },
    {
      title: 'Горькая ягода',
      answer: 'Калина',
      price: 400,
      topic: plantsT._id,
    },
    {
      title: 'Какой тропический фрукт обычно едят ложкой, вынув крупную косточку?',
      answer: 'Манго',
      price: 500,
      topic: plantsT._id,
    },
    {
      title: 'Разновидностью какого овоща является турнепс?',
      answer: 'Репа',
      price: 600,
      topic: plantsT._id,
    },
    {
      title: 'Крупное долгоживущее реликтовое лиственное дерево',
      answer: 'Дуб',
      price: 700,
      topic: plantsT._id,
    },
  ]
  await Questions.insertMany([...fairyTale, ...harryPotter, ...geography, ...proverbs, ...sport, ...plants]);

  dbDisconnect();
};
seedAll()
// module.exports = seedAll;

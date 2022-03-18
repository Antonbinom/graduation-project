path = require('path'); //

module.exports = {
	context: path.resolve(__dirname, 'src'), // указываем абсолютный путь к папке src
	entry: './index.js', // внутри которой лежит index.js - точка входа
	output: { //
		filename: 'js/main.js', // имя файла - выход
		path: path.resolve(__dirname, 'dist') // путь к файлу
	},
	devServer: { // подключаем webpack livereload
		hot: true, // горячая перезагрузка
		static: { // позволяе следить за нашими файлами
			directory: './dist',
			watch: true
		}
	}
};
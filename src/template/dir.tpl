<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>{{ title }}</title>
	<style>
		body{
			margin: 0;
			padding: 100px 50px;
		}
		a{
			display: inline-block;
			width: 33%;
			text-align: left;
			height: 50px;
			line-height: 50px;
		}

		a > img {
			width: 20px;
			height: 20px;
			vertical-align: sub;
		}
	</style>
</head>
<body>
	{{#each files}}
		<a href="{{../dir}}/{{file}}">
			<img src="{{icon}}">
			{{file}}
		</a>
	{{/each}}
</body>
</html>

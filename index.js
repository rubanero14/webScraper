const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.theguardian.com/uk'

axios(url)
	.then(response => {
		const html = response.data; //this code loads/renders html properties of target website
		const $ = cheerio.load(html) //this code returns specific html properties of target website
		const articles = [] // declare this empty array to push title & url into this article array

		$('.fc-item__title', html).each(function(){ //because we fetching target data with the specific class in html, add '.' as prefix to declare it as class, or "#"if its id 
			const title = $(this).text() //this code fetches text value of the target class in html
			const url = $(this).find('a').attr('href') //this code fetches url from the a tag's href value of the target attribute in html
			articles.push({ //this function pushes the title & url data into article array
				title,
				url
			})
		}) 
		console.log(articles)
	}).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

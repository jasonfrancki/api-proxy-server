const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

// Env vars
const API_SEARCH_URL = process.env.API_SEARCH_URL
const API_DETAIL_URL = process.env.API_DETAIL_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/search', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })
    const apiRes = await needle('get', `${API_SEARCH_URL}?${params}`)
    const data = apiRes.body
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
})
router.get('/movie/:movieID', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
    })
    const apiRes = await needle(
      'get',
      `${API_DETAIL_URL}${req.params.movieID}?${params}`
    )
    const data = apiRes.body
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router

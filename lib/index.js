/*
 * aws-pricing
 * https://github.com/markw/aws-pricing
 *
 * Copyright (c) 2013 Mark Wolfe
 * Licensed under the MIT license.
 */

var http = require('http')
  , host = 'http://a0.awsstatic.com/pricing/1/deprecated/ec2'

var _buildUrl = function (path) {
  return [host, path].join('/')
}

var _retrieveUrl = function (jsonFile, callback) {

  var body = ''

  http.get(_buildUrl(jsonFile),function (res) {

    res.setEncoding('utf8')

    // this is a very simplistic body builder however it works
    res.on('data', function (chunk) {
      body = body + chunk
    })
    res.on('end', function () {
      if (res.statusCode === 200) {
        callback(null, JSON.parse(body))
      } else {
        callback(new Error('Unexpected HTTP response code: ' + res.statusCode))
      }
    })
  }).on('error', function (e) {
    callback(e)
  })

}

exports.requestOnDemandPricing = function (callback) {
  _retrieveUrl('pricing-on-demand-instances.json', callback)
}

exports.requestDataTransferPricing = function (callback) {
  _retrieveUrl('pricing-data-transfer.json', callback)
}

exports.requestElasticIpsPricing = function (callback) {
  _retrieveUrl('pricing-elastic-ips.json', callback)
}

exports.requestElasticLoadBalancerPricing = function (callback) {
  _retrieveUrl('pricing-elb.json', callback)
}


---
title: Geocoding
date: 2022-01-15
tags:
  - Go
  - Documentation
  - API
---

Returns returns geometries of locations and addresses in quick search.

# Geocoding Autocomplete

Returns returns geometries of locations and addresses in quick search. 

> Version 1.0.0
### API Request

```HTTP
GET "https://clientapi.lokasimaps.com/v1.0/lokasimaps/geocoding-autocomplete?text=<string>"
```

The API request require the use of a generated `API key` as authentication. You can find your API key,
or generate a new one, by navigating to the "Credentials" side bar menu in
[Lokasi API](https://developer.lokasimaps.com) website
or you can contact sales@bvarta.com for more detail information.

The authentication need to be provided in HTTP header as `x-api-key: "your-API-key"`,
and to indicate that the content of a request or a response is in JSON format, you need to provide
`Content-Type: application/json` in HTTP header as well.


### API Response

#### Body Response


```JSON
{
    "bbox": [
        108.8902850625,
        -8.214144789,
        114.3722779476,
        -6.7529901706
    ],
    "features": [
        {
            "bbox": [
                113.7097937656,
                -8.1591476406,
                113.7097937656,
                -8.1591476406
            ],
            "geometry": {
                "coordinates": [
                    113.7097937656,
                    -8.1591476406
                ],
                "type": "Point"
            },
            "properties": {
                "accuracy": "centroid",
                "country": "INDONESIA",
                "distance": 13250.449,
                "district": "JEMBERLOR",
                "gid": "bvarta:street:2958428112757",
                "label": "Jalan Sudirman, PATRANG, JEMBERLOR, JEMBER, JAWA TIMUR, INDONESIA",
                "layer": "street",
                "name": "Jalan Sudirman",
                "province": "JAWA TIMUR",
                "regency": "JEMBER",
                "source": "bvarta",
                "street": "Jalan Sudirman",
                "village": "PATRANG"
            },
            "type": "Feature"
        },
    "geocoding": {
        "attribution": "Geocoding - API",
        "timestamp": 1639368830775,
        "version": "0.2"
    },
    "type": "FeatureCollection"
```

The JSON structures on body response devided on three fields (key-value pairs).

- `features` return an array of geocoding autocomplete data object.
- `geocoding` return an object about information of geocoding autocomplete service. 
- `type` `return` type of object.

**Geocoding Autocomplete Data**

See the structure example on each geocoding autocomplete data below:  

```JSON
           "geometry": {
                "coordinates": [
                    113.7097937656,
                    -8.1591476406
                ],
                "type": "Point"
            },
            "properties": {
                "accuracy": "centroid",
                "country": "INDONESIA",
                "distance": 13250.449,
                "district": "JEMBERLOR",
                "gid": "bvarta:street:2958428112757",
                "label": "Jalan Sudirman, PATRANG, JEMBERLOR, JEMBER, JAWA TIMUR, INDONESIA",
                "layer": "street",
                "name": "Jalan Sudirman",
                "province": "JAWA TIMUR",
                "regency": "JEMBER",
                "source": "bvarta",
                "street": "Jalan Sudirman",
                "village": "PATRANG"
            },
            "type": "Feature"
```
        
        
       
        
-  `geometry` return an objects about geometry information of each geocoding autocomplete data.
There are two fields (key-value pairs) in this object, `coordinate` with return value
`[ "longitude", "latitude" ]`, and `type` with return value a type of geometry.

-  `properties` return an object contain information fields (key-value pairs) of
each geocoding autocomplete data. The object field (key-value pairs) described as follows.

    - `accuracy` return the coordinates based on centroid data and point. 
    - `confidence` return the accuracy level of object.
    - `country` return the country of the object.  
    - `distance` return the distance between the object and focus point. 
    - `district` return the information about district. 
    - `gid` return return geometry id of the object. 
    - `label` return the administrative area information of object. 
    - `layer` return the information about type of object.
    - `match_type` return the information of suitability of the objec. 
    - `name` return the name information of the object.
    - `province` return the information of province.
    - `regency` return the information of regency.
    - `source` return the information of data source.
    - `street` return the information of street. 
    - `village` return the information of village.
    
**General Information of API Response**

The API response have information about attribution, timestamp, and version
in `geocoding` key with fields (key-value pairs) described as follows.



```JSON
     "geocoding": {
        "attribution": "Geocoding - API",
        "timestamp": 1639361300435,
        "version": "0.2"
    },
    "type": "FeatureCollection"
```


-  `geocoding` return a geocoding object information with fields (key-value pairs)
described as follows.

    - `attribution` return service information.
    - `timestamp` return time access information.
    - `version` return version of service.
    
       
#### HTTP Status Code

| Status code | Description | Detail |
| :------ | :------ | :----- |
| 200 | OK | Request Success |
| 400 | Bad request | An error occurred on client’s side |
| 500 | Internal server error | An error occurred on server’s side |

    



import 'ol/ol.css';
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import ImageLayer from 'ol/layer/Image';
import Projection from "ol/proj/Projection";
import {get as getProjection} from "ol/proj";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Graticule from "ol/Graticule";


import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import Static from 'ol/source/ImageStatic';


let eqrecExtent = getProjection('EPSG:4326').getExtent();
let offsetExtent = [-180 + 197, -90, 180 + 197, 90];

let offsetProj = new Projection({
	axisOrientation: 'neu',
	code: 'FGIS:1001',
	extent: offsetExtent,
	worldExtent: offsetExtent,
	global: true,
	units: 'degrees',
	canWarpX: true
});

let eqrecProj = new Projection({
	axisOrientation: 'neu',
	code: 'FGIS:1001',
	extent: eqrecExtent,
	worldExtent: eqrecExtent,
	global: true,
	units: 'degrees',
	canWarpX: true
});

let bordersTransform = [0,0];
let bordersOffset = [100, 0];
let offsetBordersExtent = [ eqrecExtent[0] + bordersOffset[0], eqrecExtent[1] + bordersOffset[1], eqrecExtent[2] - bordersTransform[0] + bordersOffset[0], eqrecExtent[3] - bordersTransform[1] + bordersOffset[1]];

console.log("Offset : ", offsetBordersExtent);
console.log("Proj. extent : ", offsetProj.getExtent());
console.log(offsetProj);


const map = new Map({
    target: 'map-container',
    layers: [
        new TileLayer({
            source: new XYZ({
                //url: 'http://ksp.deringenieur.net/kmaps/tiles/kerbin/sat/{z}/{x}/{-y}.png',
                tileUrlFunction: function (coordinate) {

                    if (coordinate === null) return undefined;

                    //console.log('Zoom: ' + coordinate[0] + '(t:' + (coordinate[0]-1) + ', Tile: (' + coordinate[1] + ',' + -coordinate[2] + ')')
                    // TMS Style URL
                    var z = coordinate[0] - 1;
                    var x = coordinate[1];
                    var y = coordinate[2] + Math.pow(2, z);
                    var url = 'http://tiles-arii.herrcrazi.tk/tiles/kerbin/sat/' + z + '/' + x + '/' + y + '.png';

                    return url;
                },
                projection: offsetProj,
                //extent: eqrecExtent
            }),
           	//extent: eqrecExtent
        }),

        new TileLayer({
            source: new XYZ({
                tileUrlFunction: function (coordinate) {

                    if (coordinate === null) return undefined;

                    // TMS Style URL
                    var z = coordinate[0] - 1;
                    var x = coordinate[1];
                    var y = coordinate[2] + Math.pow(2, z);
                    var url = 'http://tiles-arii.herrcrazi.tk/tiles/kerbin/biome/' + z + '/' + x + '/' + y + '.png';

                    return url;
                },
                projection: offsetProj,
                //extent: eqrecExtent
            }),
            opacity: 0.25
            //extent: eqrecExtent
        }),
        
        new ImageLayer({
        	source: new Static({
        		url: 'http://tiles-arii.herrcrazi.tk/raster/kp/borders.png',
        		projection: offsetProj, //'EPSG:4326',
        		imageExtent: [-227.8,-90+2,580,90+2-4],
			    imageSize: [0,0,4700,2000]
        	}),
        })
    ],

    view: new View({
        center: [0,0],
        //extent: [0,-90,360,90],
        zoom: 2.3,
        minZoom: 1,
        maxZoom: 6,
        projection: eqrecProj //'EPSG:4326'
    })
});

const graticule = new Graticule({
	map: map,
	showLabels: false
})

console.log(eqrecExtent);


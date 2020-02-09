

import 'ol/ol.css';
import { Map as OLMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import ImageLayer from 'ol/layer/Image';
import Projection from "ol/proj/Projection";
import { get as getProjection } from "ol/proj";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import Graticule from "ol/Graticule";


console.log("Imported map.js")
var map;
const _tileserver = 'http://tiles-arii.herrcrazi.tk/tiles/';
const defaultOptions = {
    title: 'KSP Layer',
    opacity: 1,
    layerIcon: 'images/body-kerbin.png'
}

export default {
    
    createMap(outletID, tileserver)
    {
        if (tileserver) {
            _tileserver = tileserver
        }

        map = new OLMap({
            target: outletID,
            layers: [
                
            ],

            view: new View({
                center: [0, 0],
                //extent: [0,-90,360,90],
                zoom: 2.3,
                minZoom: 1,
                maxZoom: 6,
                projection: 'EPSG:4326'
            })
        })

        const graticule = new Graticule({
            map: map,
            showLabels: false
        })
    },
    
    getOLMap() {
        return map;
    },
    
    getLayers() {
        return map.getLayers().getArray();
    },

    addKerbalLayer(layerData, options) {
        let layer = new TileLayer({
            ...{
                source: new XYZ({
                    tileUrlFunction: function (coordinate) {

                        if (coordinate === null) return undefined;

                        // TMS Style URL
                        var z = coordinate[0] - 1;
                        var x = coordinate[1];
                        var y = coordinate[2] + Math.pow(2, z);
                        var url = _tileserver + layerData + z + '/' + x + '/' + y + '.png';

                        return url;
                    },
                    projection: 'EPSG:4326',
                })
            },
            ...defaultOptions,
            ...options
        });        
        map.addLayer(layer)
        
    }
}

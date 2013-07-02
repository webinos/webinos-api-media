/*******************************************************************************
*    Code contributed to the webinos project
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*    
*         http://www.apache.org/licenses/LICENSE-2.0
*    
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* 
* Copyright 2011 Istituto Superiore Mario Boella (ISMB)
******************************************************************************/

(function() {
    "use strict";
    var path = require('path');
    var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;
    
    var media_module = require(path.resolve(__dirname,'media_module.js'));
    
    
    var KEYS_UP="$'\e'[A";
    var KEYS_DOWN="$'\e'[B";
    var KEYS_RIGHT="$'\e'[C";
    var KEYS_LEFT="$'\e'[D";
    
    /**
     * Webinos Service constructor.
     * @param rpcHandler A handler for functions that use RPC to deliver their result.    
     */
     
    var MediaApiModule = function(rpcHandler, params) {
        this.rpcHandler = rpcHandler;
        this.params = params;
    };
     
    MediaApiModule.prototype.init = function (register, unregister) 
    {
        var service = new Media(this.rpcHandler, this.params);
        register(service);
    };
    
    var Media = function(rpcHandler, params) {
        // inherit from RPCWebinosService
        this.base = RPCWebinosService;
        this.base({
            api: 'http://webinos.org/api/media',
            displayName: 'MediaPlay',
            description: 'W3C Media Play Module'
        });

    };
    
    Media.prototype = new RPCWebinosService;

    Media.prototype.playvideo = function (videoPath, successCB, errorCB)
    {
        "use strict";
        media_module.startplay(videoPath, successCB, errorCB);
    }

    Media.prototype.stepback = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command(KEYS_LEFT, successCB, errorCB);
    }
    
    Media.prototype.bigStepback = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command(KEYS_DOWN, successCB, errorCB);
    }    
        
    Media.prototype.stepforward = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command(KEYS_RIGHT, successCB, errorCB);
    }
    
    
    Media.prototype.bigStepforward = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command(KEYS_UP, successCB, errorCB);
    }
    
    Media.prototype.playPause = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('p', successCB, errorCB);
    }
    
    Media.prototype.stop = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('q', successCB, errorCB);
    }
    
    Media.prototype.volumeUP = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('+', successCB, errorCB);
    }
    
    Media.prototype.volumeDOWN = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('-', successCB, errorCB);
    }
    
    Media.prototype.increasePlaybackSpeed = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('2', successCB, errorCB);
    }
    
    Media.prototype.decreasePlaybackSpeed = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('1', successCB, errorCB);
    }
    
    Media.prototype.showInfo = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('z', successCB, errorCB);
    }

    Media.prototype.toggleSubtitle = function (params, successCB, errorCB)
    {
        "use strict";
        media_module.command('s', successCB, errorCB);
    }
    
    // export our object
    exports.Module = MediaApiModule;    
})()

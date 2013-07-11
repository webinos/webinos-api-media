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

var fs = require("fs");
var exec = require('child_process').exec;

var pipe = "webinosOmxPipe";
var DEFAULT_PATH = '/tmp/';

this.startplay = function(path, successCB, errorCB) {
    var path_ = path[0];
    exec('killall omxplayer.bin');	
    if (!fs.existsSync(DEFAULT_PATH + pipe)) exec('mkfifo ' + DEFAULT_PATH + pipe);
    
    //Check for potential harmful characters for shell execution and escape them
    path_=path_.replace(/(["\s'$`\\])/g,'\\$1');

    //start the process 
    var child = exec('omxplayer -o hdmi "' + path_ + '" --vol -2400 < ' + DEFAULT_PATH + pipe);

    //clean up the fifo unconditionally on close
    child.on("close", function (exitCode) {
        console.log("omxplayer closed, code: " + child.exitCode);
        exec('rm '+ DEFAULT_PATH + pipe);
    });
    
    exec('echo \n > ' + DEFAULT_PATH + pipe);
    
    //handle the method invocation callbacks
    	setTimeout(function(){
		if(child.exitCode != null  && child.stdout.destroyed){
			console.log("errorCB: omxplayer destroyed ");
			errorCB("omxplayer closed unexpectedly");
		}	
		else{
			console.log("successCB: omxplayer init successfully ");
			successCB("successCB: OmxPlayer playing with PID " + child.pid);
		}		
	}, 500);
};

this.command = function(key,successCB, errorCB){
    if(fs.existsSync(DEFAULT_PATH+pipe))
    {
        exec('echo -n '+key.toString()+' > '+DEFAULT_PATH+pipe);
        if(typeof successCB === 'function')successCB("command sent");
    }
    else
        if(typeof errorCB === 'function')errorCB("no omxplayer process");
};




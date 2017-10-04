# -*- coding: utf-8 -*-
'''
@author: jonititan
'''

import subprocess
# --fdm=null turns the fdm system off.
cl_options = {
    'telnet':5500,
    'httpd':8080,
    'aircraft':'A330-223',
    'airport':'KBOS',
    'heading':0,
    'timeofday':'noon',
    'altitude':36000,
    'vc':270,
    'glideslope':1,
    'roc':0,
    'roll':0,
}
properties = {
    '/autopilot/settings/target-altitude-ft':36000,
    '/autopilot/settings/target-speed-kt':270,
    '/autopilot/locks/altitude':'altitude-hold',
    '/autopilot/locks/speed':'speed-with-throttle',
    '/autopilot/locks/heading':'wing-leveler',
    '/engines/engine[0]/running':'true',
    '/engines/engine[1]/running':'true',
    '/controls/gear/gear-down':'false'
    
    
        }
parsed_props = ['--prop:'+key_val+'='+str(properties[key_val]) for key_val in properties.keys()]
parsed_options = ['--'+key_val+'='+str(cl_options[key_val]) for key_val in cl_options.keys() if cl_options[key_val] != False]
parsed_options.extend(parsed_props)
subprocess.Popen(r'/usr/games/fgfs '+' '.join(parsed_options), shell=True)

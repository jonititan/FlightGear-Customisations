// Configure require.js and tell it where to find our modules
require.config({
    baseUrl : '.', // use this base if we don't give absolute paths
    paths : {
        knockout : '/3rdparty/knockout/knockout-3.2.0',
        knockprops : '/lib/knockprops'
    },
});

require([
         // we depend on those modules
        'knockout', // lookup 'knockout' in the 'paths' attribute above,
                    // load the script and pass the resulting object as the
                    // first parameter below
        'knockprops' // load 'knockprops' in the 'paths' attribute above etc.

], function(ko) {
    // ko is now the locally available knockout extension
    // the second arg would be knockprops but that is not needed as it registers itself with knockout.utils


    // this creates the websocket to FG and registers listeners for the named properites
    ko.utils.knockprops.setAliases({
      gmt : "/sim/time/gmt",
      timeWarp : "/sim/time/warp",
      // flight
      pitch : "/orientation/pitch-deg",
      roll : "/orientation/roll-deg",
      heading : "/orientation/heading-magnetic-deg",
      "true-heading" : "/orientation/heading-deg",
      altitude : "/position/altitude-ft",
      latitude : "/position/latitude-deg",
      longitude : "/position/longitude-deg",
      airspeed : "/velocities/airspeed-kt",
      groundspeed : "/velocities/groundspeed-kt",
      slip : "/instrumentation/slip-skid-ball/indicated-slip-skid",
      cg : "/fdm/jsbsim/inertia/cg-x-in",
      weight : "/fdm/jsbsim/inertia/weight-lbs",
      fob_lbs : "/consumables/fuel/total-fuel-lbs",
      eg0_fuelflow : "/engines/engine[0]/fuel-flow_actual",
      eg1_fuelflow : "/engines/engine[1]/fuel-flow_actual",
      eg0_n3 : "/engines/engine/n3",
      eg1_n3 : "/engines/engine[1]/n3",
      eg0_epr : "/ECAM/Upper/EPR",
      eg1_epr : "/ECAM/Upper/EPR[1]",
      eg0_eprThr : "/ECAM/Upper/EPRthr",
      eg1_eprThr : "/ECAM/Upper/EPRthr[1]",
      eprYLim : "/ECAM/Upper/EPRylim",
      eg0_egt : "/ECAM/Upper/EGT",
      eg1_egt : "/ECAM/Upper/EGT[1]",
      eg0_n1 : "/ECAM/Upper/N1",
      eg1_n1 : "/ECAM/Upper/N1[1]",
      eg0_n1Thr : "/ECAM/Upper/N1thr",
      eg1_n1Thr : "/ECAM/Upper/N1thr[1]",
      n1yLim : "/ECAM/Upper/N1ylim",
      oat_degc : "/environment/temperature-degc",
      apu_load : "/systems/electrical/extra/apu-load",
      apu_volts : "/systems/electrical/extra/apu-volts",
      apu_hz : "/systems/electrical/extra/apu-hz",
      bleadapu : "/systems/pneumatic/bleedapu",
      eg0_oilpsi : "/engines/engine/oil-psi-actual",
      eg1_oilpsi : "/engines/engine[1]/oil-psi-actual",
      apu_n1 : "/ECAM/Lower/APU-N",
      apu_egt : "/ECAM/Lower/APU-EGT",
      eg0_oilqt : "/engines/engine/oil-qt-actual",
      eg1_oilqt : "/engines/engine[1]/oil-qt-actual",
      eg0_oilpsi : "/ECAM/Lower/Oil-PSI",
      eg1_oilpsi : "/ECAM/Lower/Oil-PSI[1]"
    });


    // knockout stuff - create a ViewModel representing the data of the page
    function ViewModel(params) {
        var self = this;

        ko.utils.knockprops.makeObservablesForAllProperties( self );

        self.wholeFobLbs = ko.pureComputed(function() {
            return Math.round(self.fob_lbs());
        });

        self.wholeEgt0 = ko.pureComputed(function() {
            return Math.round(self.eg0_egt());
        });


        self.wholeEgt1 = ko.pureComputed(function() {
            return Math.round(self.eg1_egt());
        });

    }


    // Create the ViewModel instance and tell knockout to process the data-bind
    // attributes of all elements within our wrapper-div.
    ko.applyBindings(new ViewModel(), document.getElementById('wrapper'));

    // now, every update of a registered property in flightgear gets to our browser
    // through the websocket. Knockprops delivers each change to the associated ko.observable
    // and fires the listeners of the observable. Those listeners trigger the change of the HTML DOM
    // which results in a redraw of the browser window.
});

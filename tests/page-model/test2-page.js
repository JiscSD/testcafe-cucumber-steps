'use strict';

// #############################################################################

let test2Page = {

    protocol: 'http://',
    textGold: 'Gold',
    textIndigo: 'Indigo',
    dropdownColors: '#dropdown-colors',
    blockDropdownColor: '#block-dropdown-color',
    inputColors: '#input-colors',
    blockInputColor: '#block-input-color',
    updateText: function () {
        document.getElementById('text-test').innerHTML = 'Text to test ' +
            'script execution';
    }

};

test2Page.pageTest2 = `${test2Page.protocol}localhost:8001/test2.html`;

module.exports = test2Page;

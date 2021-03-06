/** 
* @see https://github.com/passwordcockpit/frontend for the canonical source repository 
* @copyright Copyright (c) 2018 Blackpoints AG (https://www.blackpoints.ch) 
* @license https://github.com/passwordcockpit/frontend/blob/master/LICENSE.md BSD 3-Clause License 
*/

import Controller, { inject as controller } from '@ember/controller';

export default Controller.extend({
    foldersController: controller('folders'),
    showList: true,
    actions: {
        /**
         * Toggle passwords list visibility (only for mobile)
         */
        showPasswordsList() {
            this.set('showList', true);
        },
        hidePasswordsList() {
            this.set('showList', false);
        },
    }
});

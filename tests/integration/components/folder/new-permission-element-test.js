/** 
* @see https://github.com/passwordcockpit/frontend for the canonical source repository 
* @copyright Copyright (c) 2018 Blackpoints AG (https://www.blackpoints.ch) 
* @license https://github.com/passwordcockpit/frontend/blob/master/LICENSE.md BSD 3-Clause License 
*/

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | browser error', function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function () {
        const intl = this.owner.lookup('service:intl');
        intl.set('locale', ['en', 'it']);
    });
    test('it renders', async function (assert) {
        await render(hbs`{{folder/new-permission-element}}`);

        assert.equal($.trim(this.$().text().trim().replace(/\s\s+/g, ' ')), 'Manage Cancel Add');

        // Template block usage:
        await render(hbs`
        {{#folder/new-permission-element}}
          template block text
        {{/folder/new-permission-element}}
      `);

        assert.equal($.trim(this.$().text().trim().replace(/\s\s+/g, ' ')), 'Manage Cancel Add');
    });
});
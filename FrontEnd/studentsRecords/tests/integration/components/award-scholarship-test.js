import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('award-scholarship', 'Integration | Component | award scholarship', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{award-scholarship}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#award-scholarship}}
      template block text
    {{/award-scholarship}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

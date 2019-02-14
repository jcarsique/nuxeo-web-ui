/**
@license
(C) Copyright Nuxeo Corp. (http://nuxeo.com/)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
`nuxeo-document-diff`
@group Nuxeo UI
@element nuxeo-document-diff
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { DiffBehavior } from '../nuxeo-diff-behavior.js';
Polymer({
  _template: html`
    <style include="nuxeo-diff-styles">
      :host {
        @apply --layout-horizontal;
      }
    </style>
    <template is="dom-if" if="[[displayLabel]]">
      <div class="label">
        <span style\$="[[_computeIndentStyle(level, isArrayItem)]]">[[_computeLabel(property, label)]]</span>
      </div>
    </template>
    <div class="value simple">
      <!-- no changes -->
      <template is="dom-if" if="[[_hasNoChanges(delta, originalValue)]]">
        <a href\$="[[urlFor('browse', originalValue.path)]]">[[originalValue.title]]</a>
      </template>
      <!-- additions -->
      <template is="dom-if" if="[[_hasAddition(delta, hideAdditions)]]">
        <template is="dom-if" if="[[_getAddition(delta)]]">
          <div class="addition">
            <a href\$="[[urlFor('browse', newValue.path)]]"><span class="added">[[newValue.title]]</span></a>
          </div>
        </template>
      </template>
      <!-- modifications -->
      <template is="dom-if" if="[[_hasModification(delta)]]">
        <template is="dom-if" if="[[!hideDeletions]]">
          <!-- old value -->
          <template is="dom-if" if="[[_getModificationOldValue(delta)]]">
            <div class="deletion">
              <a href\$="[[urlFor('browse', originalValue.path)]]"><span class="deleted">[[originalValue.title]]</span></a>
            </div>
          </template>
        </template>
        <template is="dom-if" if="[[!hideAdditions]]">
          <!-- new value -->
          <template is="dom-if" if="[[_getModificationNewValue(delta)]]">
            <div class="addition">
              <a href\$="[[urlFor('browse', newValue.path)]]"><span class="added">[[newValue.title]]</span></a>
            </div>
          </template>
        </template>
      </template>
      <!-- deletions -->
      <template is="dom-if" if="[[_hasDeletion(delta, hideDeletions)]]">
        <template is="dom-if" if="[[_getDeletion(delta)]]">
          <div class="deletion">
            <a href\$="[[urlFor('browse', originalValue.path)]]"><span class="deleted">[[originalValue.title]]</span></a>
          </div>
        </template>
      </template>
      <!-- object with inner changes -->
      <template is="dom-if" if="[[_hasObjectInnerChanges(delta)]]">
        <template is="dom-if" if="[[!hideDeletions]]">
          <div class="deletion">
            <a href\$="[[urlFor('browse', originalValue.path)]]"><span class="deleted">[[originalValue.title]]</span></a>
          </div>
        </template>
        <template is="dom-if" if="[[!hideAdditions]]">
          <div class="addition">
            <a href\$="[[urlFor('browse', newValue.path)]]"><span class="added">[[newValue.title]]</span></a>
          </div>
        </template>
      </template>
    </div>
`,

  is: 'nuxeo-document-diff',
  behaviors: [DiffBehavior, RoutingBehavior]
});

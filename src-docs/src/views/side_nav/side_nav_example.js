import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSideNav } from '../../../../src/components';

import SideNav from './side_nav';
const sideNavSource = require('!!raw-loader!./side_nav');
const sideNavHtml = renderToHtml(SideNav);
const sideNavSnippet = `<EuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Kibana',
      id: 0,
      items: [
        {
          name: 'Advanced settings',
          id: 1,
          onClick: () => selectItem('Advanced settings'),
        },
        {
          name: 'Index Patterns (link)',
          id: 2,
          href: '#',
        },
      ]
    }
  ]}
/>
`;

import SideNavComplex from './side_nav_complex';
const sideNavComplexSource = require('!!raw-loader!./side_nav_complex');
const sideNavComplexHtml = renderToHtml(SideNavComplex);
const sideNavComplexSnippet = `<EuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Elasticsearch',
      icon: <EuiIcon type="logoElasticsearch" />,
      id: '0',
      items: [
        {
          name: 'Data source',
          id: '0.1',
          onClick: () => selectItem('Data source'),
        },
        {
          name: 'Users',
          id: '0.2',
          href: '#',
        },
      ],
    },
    {
      name: 'Kibana',
      icon: <EuiIcon type="logoKibana" />,
      id: '1',
      items: [
        {
          name: 'Advanced settings',
          id: '1.1',
          onClick: () => selectItem('Advanced settings'),
          items: [
            {
              name: 'General',
              id: '1.1.1',
              onClick: () => selectItem('General'),
            },
            {
              name: 'Timelion',
              id: '1.1.2',
              onClick: () => selectItem('Timelion'),
              items: [
                {
                  name: 'Time Stuff',
                  id: '1.1.2.1',
                  onClick: () => selectItem('Time Stuff'),
                },
                {
                  name: 'Lion Stuff',
                  id: '1.1.2.2',
                  onClick: () => selectItem('Lion Stuff'),
                  isSelected: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import SideNavForceOpen from './side_nav_force_open';
const sideNavForceOpenSource = require('!!raw-loader!./side_nav_force_open');
const sideNavForceOpenHtml = renderToHtml(SideNavForceOpen);
const sideNavForceSnippet = `<EuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'Kibana',
      id: '1',
      items: [
        {
          name: 'Kibana',
          id: '1',
          items: [
            {
              name: 'Forced open items',
              id: '0.1',
              onClick: () => selectItem('Forced open items'),
              forceOpen: true,
              items: [
                {
                  name: 'General',
                  id: '0.1.1',
                  onClick: () => selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '0.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
            {
              name: 'Closed items',
              id: '1.1',
              onClick: () => selectItem('Closed items'),
              forceOpen: false,
              items: [
                {
                  name: 'General',
                  id: '1.1.1',
                  onClick: () => this.selectItem('General'),
                },
                {
                  name: 'Timelion',
                  id: '1.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import SideNavEmphasis from './side_nav_emphasis';
const sideNavEmphasisSource = require('!!raw-loader!./side_nav_emphasis');
const sideNavEmphasisHtml = renderToHtml(SideNavEmphasis);
const sideNavEmphasisSnippet = `<EuiSideNav
  mobileTitle="Navbar Items"
  toggleOpenOnMobile={toggleOpenOnMobile}
  isOpenOnMobile={isSideNavOpenOnMobile}
  items={[
    {
      name: 'APM',
      id: '1',
      items: [
        {
          name: 'Services',
          id: '2',
          items: [
            {
              name: 'opbeans-java',
              emphasize: true,
              isOpen: true,
              items: [
                {
                  name: 'Transactions',
                  id: '0.1.1',
                  onClick: () => selectItem('General'),
                },
                {
                  name: 'Errors',
                  id: '0.1.2',
                  onClick: () => selectItem('Timelion'),
                },
              ],
            },
          ],
        },
      ],
    },
  ]}
/>
`;

import { SideNavItem } from './props';
import { EuiCallOut } from '../../../../src/components/call_out';

export const SideNavExample = {
  title: 'Side nav',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>EuiSideNav</strong> is a responsive menu system that usually
            sits on the left side of a page layout. It will expand to the width
            of its container. This is the menu that is used on the left side of
            the page you are currently looking at.
          </p>

          <p>
            Configure the content of a <strong>EuiSideNav</strong> by passing in
            an <EuiCode>items</EuiCode> prop. Refer to the source code for an
            example of this data structure&rsquo;s anatomy.
          </p>
        </div>
      ),
      props: { EuiSideNav, EuiSideNavItem: SideNavItem },
      snippet: sideNavSnippet,
      demo: <SideNav />,
    },
    {
      title: 'Complex side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavComplexHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiSideNav</strong> also supports multiple top level sections
          and deeply-nested tree-based data.
        </p>
      ),
      snippet: sideNavComplexSnippet,
      demo: <SideNavComplex />,
    },
    {
      title: 'Forced open side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavForceOpenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavForceOpenHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiSideNav</strong> items can be forced open by setting{' '}
          <EuiCode>items[n].forceOpen = true</EuiCode>
        </p>
      ),
      snippet: sideNavForceSnippet,
      demo: <SideNavForceOpen />,
    },
    {
      title: 'Emphasized side nav sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavEmphasisSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavEmphasisHtml,
        },
      ],
      text: (
        <>
          <p>
            Adding the <EuiCode>emphasize = true</EuiCode> prop to a{' '}
            <strong>EuiSideNav</strong> item will enhance the visual appearance
            of that section and its nested items. This is helpful for when you
            need to indicate a dynamic navigational item like a user-created
            object.
          </p>
          <EuiCallOut iconType="editorCodeBlock" title="Extra style needed">
            <p>
              The emphasized nav item&apos;s background color extends beyond the
              horizontal bounds of the component to allow it to reach it&apos;s
              parents bounds. Be sure to add{' '}
              <EuiCode language="sass">{'overflow: hidden'}</EuiCode> to
              whichever container you&apos;d like it to stop at.
            </p>
          </EuiCallOut>
        </>
      ),
      snippet: sideNavEmphasisSnippet,
      demo: <SideNavEmphasis />,
    },
  ],
};

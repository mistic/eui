/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ProgressHTMLAttributes,
  ReactNode,
  Fragment,
  CSSProperties,
} from 'react';
import classNames from 'classnames';
import { EuiI18n } from '../i18n';
import { EuiInnerText } from '../inner_text';
import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import { isNil } from '../../services/predicate';

const sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiProgressSize = keyof typeof sizeToClassNameMap;

export type ProgressColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'subdued'
  | 'accent'
  | 'vis0'
  | 'vis1'
  | 'vis2'
  | 'vis3'
  | 'vis4'
  | 'vis5'
  | 'vis6'
  | 'vis7'
  | 'vis8'
  | 'vis9';

const colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  success: 'euiProgress--success',
  warning: 'euiProgress--warning',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent',
  vis0: 'euiProgress--vis0',
  vis1: 'euiProgress--vis1',
  vis2: 'euiProgress--vis2',
  vis3: 'euiProgress--vis3',
  vis4: 'euiProgress--vis4',
  vis5: 'euiProgress--vis5',
  vis6: 'euiProgress--vis6',
  vis7: 'euiProgress--vis7',
  vis8: 'euiProgress--vis8',
  vis9: 'euiProgress--vis9',
};

export const COLORS = keysOf(colorToClassNameMap);

type NamedColor = keyof typeof colorToClassNameMap;

function isNamedColor(name: string): name is NamedColor {
  return colorToClassNameMap.hasOwnProperty(name);
}

export type EuiProgressColor = keyof typeof colorToClassNameMap;

const dataColorToClassNameMap: { [color in ProgressColor]: string } = {
  primary: 'euiProgress__data--primary',
  secondary: 'euiProgress__data--secondary',
  success: 'euiProgress__data--success',
  warning: 'euiProgress__data--warning',
  danger: 'euiProgress__data--danger',
  subdued: 'euiProgress__data--subdued',
  accent: 'euiProgress__data--accent',
  vis0: 'euiProgress__data--vis0',
  vis1: 'euiProgress__data--vis1',
  vis2: 'euiProgress__data--vis2',
  vis3: 'euiProgress__data--vis3',
  vis4: 'euiProgress__data--vis4',
  vis5: 'euiProgress__data--vis5',
  vis6: 'euiProgress__data--vis6',
  vis7: 'euiProgress__data--vis7',
  vis8: 'euiProgress__data--vis8',
  vis9: 'euiProgress__data--vis9',
};

const positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: '',
};

export const POSITIONS = keysOf(positionsToClassNameMap);

export type EuiProgressPosition = keyof typeof positionsToClassNameMap;

export type EuiProgressProps = CommonProps & {
  size?: EuiProgressSize;
  /**
   * One of EUI's color palette, vis colors or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   */
  color?: EuiProgressColor | CSSProperties['color'];
  position?: EuiProgressPosition;
};

type Indeterminate = EuiProgressProps & HTMLAttributes<HTMLDivElement>;

type Determinate = EuiProgressProps &
  Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'max'> & {
    max?: number;
    /*
     * If true, will render the percentage, otherwise pass a custom node
     */
    valueText?: boolean | ReactNode;
    label?: ReactNode;
    /**
     * Object of props passed to the <span/> wrapping the determinate progress's label
     */
    labelProps?: HTMLAttributes<HTMLSpanElement>;
  };

export const EuiProgress: FunctionComponent<ExclusiveUnion<
  Determinate,
  Indeterminate
>> = ({
  className,
  color = 'secondary',
  size = 'm',
  position = 'static',
  max,
  valueText = false,
  label,
  value,
  labelProps,
  ...rest
}) => {
  const determinate = !isNil(max);
  let colorClass = null;
  let dataColorClass = null;
  let optionalCustomStyles: any = null;
  if (color) {
    if (isNamedColor(color)) {
      colorClass = colorToClassNameMap[color];
      dataColorClass = dataColorToClassNameMap[color];
    } else {
      optionalCustomStyles = { color: color };
      colorClass = 'euiProgress--customColor';
    }
  }
  const classes = classNames(
    'euiProgress',
    {
      'euiProgress--indeterminate': !determinate,
      'euiProgress--native': determinate,
    },
    sizeToClassNameMap[size],
    colorClass,
    positionsToClassNameMap[position],
    className
  );
  const dataClasses = classNames(
    'euiProgress__data',
    {
      'euiProgress__data--l': size === 'l',
    },
    dataColorClass
  );
  const labelClasses = classNames(
    'euiProgress__label',
    labelProps && labelProps.className
  );

  let valueRender: ReactNode;
  if (valueText === true) {
    // valueText is true
    valueRender = (
      <EuiI18n
        token="euiProgress.valueText"
        default="{value}%"
        values={{
          value,
        }}
      />
    );
  } else if (valueText) {
    // valueText exists
    valueRender = valueText;
  }

  // Because of a Firefox animation issue, indeterminate progress needs to not use <progress />.
  // See https://css-tricks.com/html5-progress-element/

  if (determinate) {
    return (
      <Fragment>
        {label || valueText ? (
          <div className={dataClasses}>
            {label && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    {...labelProps}
                    className={labelClasses}>
                    {label}
                  </span>
                )}
              </EuiInnerText>
            )}
            {valueRender && (
              <EuiInnerText>
                {(ref, innerText) => (
                  <span
                    title={innerText}
                    ref={ref}
                    style={optionalCustomStyles}
                    className="euiProgress__valueText">
                    {valueRender}
                  </span>
                )}
              </EuiInnerText>
            )}
          </div>
        ) : undefined}
        <progress
          className={classes}
          style={optionalCustomStyles}
          max={max}
          value={value}
          aria-hidden={label && valueText ? true : false}
          {...(rest as ProgressHTMLAttributes<HTMLProgressElement>)}
        />
      </Fragment>
    );
  } else {
    return (
      <div
        style={optionalCustomStyles}
        className={classes}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
};

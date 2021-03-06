import React, { PropTypes } from 'react'
import Select from 'react-select'
import styled, { injectGlobal } from 'styled-components'
import { Label, Info, Error, Wrapper } from '../themes/default'
import vendorCss from './vendor'

injectGlobal`${vendorCss}`

const StyledSelect = styled(Select)`
  .Select.is-open .Select-control {
    border-radius: 0;
  }

  .Select-control {
    border: 1px solid ${props => props.error ? props.theme.danger : props.theme.gray};
    border-radius: ${props => props.theme.radius};
    height: ${props => props.theme.height};;

    &:hover {
      box-shadow: none;
    }
  }

  .Select.is-disabled > .Select-control {
    background: ${props => props.theme.lightgray};
  }

  .Select-placeholder,
  .Select-value {
    padding-left: ${props => props.theme.padding};
    padding-right: ${props => props.theme.padding};
  }

  .Select-option.is-focused,
  .Select-option.is-selected {
    background: ${props => props.theme.default};
  }

  .Select-menu-outer {
    border-bottom-left-radius: ${props => props.theme.radius};
    border-bottom-right-radius: ${props => props.theme.radius};;
    border-color: ${props => props.error ? props.theme.danger : props.theme.primary};
  }

  .Select-placeholder {
    font-weight: 100;
  }

  .is-focused:not(.is-open) > .Select-control {
    border-color: {props => props.theme.primary};
    box-shadow: none;
  }
`


class Dropdown extends React.Component {
  static propTypes = {
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label: PropTypes.string,
    info: PropTypes.string,
    input: PropTypes.object, // passed in by redux-form
  }
  handleChange(args) {
    const { onChange, input } = this.props
    if (onChange) onChange(args)
    if (Array.isArray(args)) input.onChange(args.map(item => item[this.props.valueKey || 'id']))
    else if (input) input.onChange(args ? args[this.props.valueKey || 'id'] : null)
  }
  handleFocus(e) {
    const { onFocus, input } = this.props
    if (onFocus) onFocus(e)
    if (input) input.onFocus(e)
  }
  handleBlur(e) {
    const { onBlur, input } = this.props
    if (onBlur) onBlur(e)
    if (input) input.onBlur(input.value)
  }
  render() {
    const { error, value, input, label, info, meta } = this.props
    const reduxFormError = (meta) => (meta && meta.invalid && meta.touched) ? meta.error : null
    const currentValue = input ? input.value : value
    const errorMessage = input ? reduxFormError(meta) : error
    return (
      <Wrapper>
        <Label>{label}</Label>
        <StyledSelect
          valueKey="id"
          clearable={false}
          searchable={false}
          {...this.props}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          value={currentValue}
          error={!!errorMessage}
        />
        { !errorMessage && info && <Info>{info}</Info> }
        { errorMessage && typeof errorMessage === 'string' && <Error>{errorMessage}</Error> }
      </Wrapper>
    )
  }
}

export default Dropdown

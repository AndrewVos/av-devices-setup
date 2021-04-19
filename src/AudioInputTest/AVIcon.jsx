import SvgIcon from '@material-ui/core/SvgIcon'

const AVIcon = ({ iconName, color, className }) => {
  switch (iconName) {
    case 'play':
      return (
        <SvgIcon style={{ color }} className={className}>
          <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
        </SvgIcon>
      )
    case 'record':
      return (
        <SvgIcon style={{ color }} className={className}>
          <path d="M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z" />
        </SvgIcon>
      )
    case 'close':
      return (
        <SvgIcon style={{ color }} className={className}>
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </SvgIcon>
      )
  }
}

export default AVIcon

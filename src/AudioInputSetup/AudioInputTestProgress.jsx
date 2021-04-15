import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import RecIcon from '@material-ui/icons/FiberManualRecord'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

const AudioInputTestProgress = ({ testState = 'recording', progress }) => {
  const iconClass = 'avds-device-test-progress-circle'
  const iconStyle = { height: 18, width: 18 }

  return (
    <div className="avds-device-test-progress">
      <CircularProgress
        size={32}
        thickness={5}
        value={100}
        variant="determinate"
        classes={{ root: 'avds-device-test-progress-circle inactive' }}
      />
      {!!testState && (
        <Box position="relative" display="inline-flex">
          <CircularProgress
            size={32}
            thickness={5}
            value={progress || 0}
            variant="determinate"
            classes={{ root: `avds-device-test-progress-circle ${testState}` }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {testState === 'recording' ? (
              <RecIcon className={`${iconClass} ${testState}`} style={iconStyle} />
            ) : (
              <PlayArrowIcon className={`${iconClass} ${testState}`} style={iconStyle} />
            )}
          </Box>
        </Box>
      )}
    </div>
  )
}

export default AudioInputTestProgress

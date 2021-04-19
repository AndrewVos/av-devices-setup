function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import LinearProgress from '@material-ui/core/LinearProgress';
import DeviceError from './DeviceError';
import { getMediaDevicesList, getMediaLabel, getPermissions, reduceMediaDeviceInfo } from './helpers';

var DeviceSelect = function DeviceSelect(_ref) {
  var medium = _ref.medium,
      onChange = _ref.onChange,
      preselect = _ref.preselect;

  var _useState = useState(),
      selected = _useState[0],
      setSelected = _useState[1];

  var _useState2 = useState([]),
      available = _useState2[0],
      setAvailable = _useState2[1];

  var _useState3 = useState(),
      error = _useState3[0],
      setError = _useState3[1];

  var getAvailableDevices = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var mediaDevices, devices;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getMediaDevicesList(medium);

            case 2:
              mediaDevices = _context.sent;
              devices = mediaDevices.map(function (mediaDevice) {
                return reduceMediaDeviceInfo(mediaDevice);
              });
              setAvailable(devices);
              return _context.abrupt("return", devices);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getAvailableDevices() {
      return _ref2.apply(this, arguments);
    };
  }();
  /** Ensure permissions are available & default device available */
  // TODO: really this should only fail if audio/video permission is denied by the user
  // at the moment, it also fails if the default (first) device is in use elsewhere
  // a more intelligent handler would allow the default device to fail and load the next one


  var init = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var mediaStream;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getPermissions({
                video: medium.includes('video'),
                audio: medium.includes('audio')
              });

            case 2:
              mediaStream = _context2.sent;

              if (mediaStream.id) {
                _context2.next = 8;
                break;
              }

              setError(mediaStream.toString());
              return _context2.abrupt("return", false);

            case 8:
              return _context2.abrupt("return", true);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function init() {
      return _ref3.apply(this, arguments);
    };
  }();
  /** Initialise, get available audio devices and set USB plug listener */


  useEffect(function () {
    init().then(function (result) {
      if (result) getAvailableDevices().then(function (devices) {
        if (preselect) setSelected(preselect);else setSelected(devices[0]);
      });
      navigator.mediaDevices.addEventListener('devicechange', function () {
        getAvailableDevices().then(function (devices) {
          setSelected(devices[0]);
        });
      });
    });
  }, []);
  useEffect(function () {
    onChange(selected);
  }, [selected]);

  var onSelectDevice = function onSelectDevice(deviceId) {
    var newSelected = available.filter(function (device) {
      return device.deviceId === deviceId;
    })[0];
    setSelected(newSelected);
  };

  return error ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, getMediaLabel(medium)), /*#__PURE__*/React.createElement(DeviceError, {
    error: error,
    onClear: null
  })) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "input-label"
  }, getMediaLabel(medium)), /*#__PURE__*/React.createElement("select", {
    className: "block",
    disabled: _.isEmpty(available) || error,
    onChange: function onChange(syntheticEvent) {
      return onSelectDevice(syntheticEvent.nativeEvent.target.value);
    },
    value: selected == null ? void 0 : selected.deviceId
  }, available.map(function (item) {
    return /*#__PURE__*/React.createElement("option", {
      key: item.deviceId,
      value: item.deviceId
    }, item.label);
  })), _.isEmpty(available) && !error && /*#__PURE__*/React.createElement(LinearProgress, {
    style: {
      marginTop: -5,
      borderRadius: '0 0 4px 4px'
    }
  }));
};

export default DeviceSelect;
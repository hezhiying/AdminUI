import Checkbox from './checkbox-fuelux'
import Select2 from './jquery.select2'
import DateRangePicker from './date-range-picker'
import BootstrapDatepicker from './bootstrap-datepicker'
import utils from '../../utils/utils'

let components = [Checkbox, Select2, DateRangePicker, BootstrapDatepicker];
export default utils.regComp(components);
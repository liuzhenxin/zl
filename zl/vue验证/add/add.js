/*
文件：add.js
说明：客户新增js
作者：袁贤栩
时间：2018-07-18
修改人：
修改时间：
修改说明：
*/
import { Loading, Message, MessageBox } from 'element-ui'

export default {
  data () {
    // 验证是否是数字
    // var validateNumber = (rule, value, callback) => {
    //   var re = /^[0-9]+.?[0-9]*$/
    //   if (!re.test(value)) {
    //     callback(new Error('请输入数字'))
    //   } else {
    //     callback()
    //   }
    // }
    // 手机验证
    var PhoneValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // 邮箱验证
    var emailvalidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // 整数验证
    var numberValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else {
        const reg = /(^[0-9]*$)|(^0$)/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正整数'))
        }
      }
    }
    // 整数后4位小数验证
    var grsdsFour = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        const reg = /^0{1}([.]\d{1,4})?$|^[1-9]\d*([.]{1}[0-9]{1,4})?$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入最多四位小数'))
        }
      }
    }
    // 身份证验证
    var idCheckValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证不能为空'))
      } else {
        const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确身份证'))
        }
      }
    }

    return {
      // 记录选择类型的中间变量，更换选项之后要清空下面的列表
      selectedType: '0',

      // 银行数组
      bankArray: [],

      form: {
        // 表单字段
        clientName: '', // 客户名称
        legalPerson: '', // 企业法人
        officePhone: '', // 企业电话
        contactPerson: '', // 企业联系人
        phone: '', // 联系电话
        address: '', // 企业地址
        type: '0', // 客户类型
        bankName: '', // 开户银行
        bankAccount: '', // 银行账号
        note: '', // 备注
        taxNumber: '', // 企业税号
        email: '', // 邮箱
        qq: '', // 传真

        // 个人信息分开写
        person_phone: '',
        person_bankName: '',
        person_bankAccount: '',
        person_email: '',
        person_address: '',
        person_qq: ''
      },

      // 验证start
      rules: {
        phone: [
          {validator: PhoneValidate, trigger: 'blur'}
        ],
        clientName: [{
          required: true,
          message: '请输入客户名称234234',
          trigger: 'blur'
        },
        {
          min: 3,
          max: 100,
          message: '长度在 3 到 100 个字符',
          trigger: 'blur'
        }
        ],
        // amount: [{required: true, message: '请输入合同金额'}, {validator: validateNumber, trigger: 'blur'}],
        bankName: [{
          required: true,
          message: '请输入银行名称'
        }]

      },
      // 验证end

      optionsObj: {
        banks: [],
        type: [{
          value: '0',
          label: '企业'
        }, {
          value: '1',
          label: '个人'
        }]
      }
    }
  },
  mounted () {
    // 初始化数据
    this.getBanks()
  },
  methods: {

    // autoComplete的需求是既可以选也可以填不同的名字
    // autoComplete的查询事件
    querySearch (queryString, cb) {
      var bankArray = this.bankArray
      var results = queryString ? bankArray.filter(this.createFilter(queryString)) : bankArray
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (bankArray) => {
        // !== -1表示搜索任意字符串   ===0 表示仅匹配首字
        return (bankArray.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },

    // autoComplete 选择
    handleSelect (item) {
      this.form.purchaser = item.value
      this.form.aLinkman = item.legalPerson
      this.form.aPhone = item.phone
    },

    // 根据选择清空列表
    typeSelect () {
      // 首先记下这个变量
      this.selectedType = this.form.type
      // 重置表单
      if (this.$refs['form'] !== undefined) {
        this.$refs['form'].resetFields()
      }
      this.form.type = this.selectedType
    },

    // 银行下拉
    getBanks () {
      this.$ajax.post('/yhslzhglxt/biz/bankName').then(res => {
        if (res.data.code === 200) {
          this.optionsObj.banks = res.data.dataObj
          // 将结果加入选项，选项必须包含value
          for (let i = 0; i < this.optionsObj.banks.length; i++) {
            let tempObj = {'value': this.optionsObj.banks[i].name}
            this.bankArray.push(tempObj)
          }
        }
      })
    },

    // 表单添加提交start
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // let editorContent = this.$refs.ue.getUEContent()
          // console.log(typeof(this.form.date))
          // let json = this.form

          var json = {}

          if (this.form.type === '0') {
            json = {
              'temp.clientName': this.form.clientName, // 客户名称
              'temp.legalPerson': this.form.legalPerson, // 企业法人
              'temp.officePhone': this.form.officePhone, // 企业电话
              'temp.contactPerson': this.form.contactPerson, // 企业联系人
              'temp.phone': this.form.phone, // 联系电话
              'temp.address': this.form.address, // 企业地址
              'temp.type': this.form.type, // 客户类型
              'temp.bankName': this.form.bankName, // 开户银行
              'temp.bankAccount': this.form.bankAccount, // 银行账号
              'temp.note': this.form.note, // 备注
              'temp.taxNumber': this.form.taxNumber, // 企业税号
              'temp.email': this.form.email, // 邮箱
              'temp.qq': this.form.qq, // qq
              'temp.relation': 0
            }
          } else {
            json = {
              'temp.clientName': this.form.clientName, // 客户名称
              'temp.phone': this.form.person_phone, // 联系电话
              'temp.address': this.form.person_address, // 企业地址
              'temp.type': this.form.type, // 客户类型
              'temp.bankName': this.form.person_bankName, // 开户银行
              'temp.bankAccount': this.form.person_bankAccount, // 银行账号
              'temp.note': this.form.note, // 备注
              'temp.email': this.form.person_email, // 邮箱
              'temp.qq': this.form.person_qq // qq
            }
          }

          console.log('参数============================')
          console.log(json)

          this.save(json, formName)
        } else {
          return false
        }
      })
    },
    // 表单添加提交end
    save (json, formName) {
      let _this = this
      this.$ajax.post('/yhslzhglxt/client/save', this.$qs.stringify(json)).then(res => {
        if (res.data.code !== 200) {
          return
        }
        MessageBox.alert('<div><div class="el-message-box_img_success"></div><div>提交成功</div></div>', '提示', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          showConfirmButton: false,
          callback: action => {
            _this.add_cancel()
          }
        }),setTimeout(() => {
          MessageBox.close();
          _this.add_cancel()
        }, 400);
      }, reject => {
        this.$alert('<div><div class="el-message-box_img_err"></div><div>提交失败</div></div>', '提示', {
          dangerouslyUseHTMLString: true,
          closeOnClickModal: true,
          showConfirmButton: false
        })
      })
    },

    // 获取当天默认时间end
    add_cancel () {
      this.$router.go(-1)
    }
  },
  components: {}
}

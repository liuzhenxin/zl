<!--
文件：add.vue
说明：客户添加页面
作者：袁贤栩
时间：
修改人：
修改时间：2018-07-18
修改说明：
 -->

<style lang="scss">
@import "./add";
</style>

<template>
  <div class="customer_add_modules_outer modules_detail_outer_height">
    <div class="detailPage_wrap">

  <el-form :model="form" ref="form" :rules="rules" class="demo-dynamic">
      <!--表单-->
      <div class="detailPage_outer">
        <div class="detailPage_inner">

          <div class="detailPage_title_outer">
            <div class="detailPage_title_name">
              <div class="detailPage_title_line"></div>
              <div>新增客户</div>
            </div>
          </div>

          <div class="form_wrap">
               
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="" prop="type">
                    <div class="grid-content grid_title">客户类型</div>
                    <div class="grid-content">
                      
                      <el-select v-model="form.type" placeholder="请选择" @change="typeSelect()">
                        <el-option v-for="(item,index) in optionsObj.type" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                      
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item label="" prop="clientName">
                    <div class="grid-content grid_title"><label class="grid-must">*</label>客户名称</div>
                    <div class="grid-content"><el-input id="contract_name" v-model="form.clientName" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>

              </el-row>


            <div class="typeSelect_div" v-if="form.type=='0'">

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="" prop="legalPerson" :rules="[{ required: true, message: '请填写企业法人'}]">
                    <div class="grid-content grid_title"><label class="grid-must">*</label>企业法人</div>
                    <div class="grid-content"><el-input v-model="form.legalPerson" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="officePhone" :rules="[]">
                    <div class="grid-content grid_title">企业电话</div>
                    <div class="grid-content"><el-input v-model="form.officePhone" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="contactPerson" :rules="[{ required: true, message: '请填写联系人'}]">
                    <div class="grid-content grid_title"><label class="grid-must">*</label>联系人</div>
                    <div class="grid-content"><el-input v-model="form.contactPerson" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <!-- <el-form-item label="" prop="phone" :rules="[{ required: true, message: '请填写联系电话'}]"> -->
                    <el-form-item label="" prop="phone">
                    <div class="grid-content grid_title"><label class="grid-must">*</label>联系电话</div>
                    <div class="grid-content"><el-input v-model="form.phone" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="qq" :rules="[]">
                    <div class="grid-content grid_title">QQ</div>
                    <div class="grid-content"><el-input v-model="form.qq" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="email" :rules="[]">
                    <div class="grid-content grid_title">企业邮箱</div>
                    <div class="grid-content"><el-input v-model="form.email" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <!--  prop="bankName" -->
                  <el-form-item label="">
                    <div class="grid-content grid_title">开户银行</div>
                    <div class="grid-content input_jiafang">
                      <el-autocomplete class="inline-input" v-model="form.bankName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="bankAccount" :rules="[]">
                    <div class="grid-content grid_title">银行账号</div>
                    <div class="grid-content"><el-input v-model="form.bankAccount" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="taxNumber">
                    <div class="grid-content grid_title">企业税号</div>
                    <div class="grid-content"><el-input v-model="form.taxNumber" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="" prop="address">
                    <div class="grid-content grid_title">地址</div>
                    <div class="grid-content"><el-input v-model="form.address" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item
                    label=""
                    prop="note"
                    :rules="[]">
                  <div class="grid-content grid_title">经营范围</div>
                  <div class="grid-content">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 5}"
                      placeholder="请输入内容"
                      v-model="form.businessScope">
                    </el-input>
                  </div>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
            <!--企业输入框结束-->





            <div class="typeSelect_div" v-if="form.type=='1'">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="" prop="person_phone" :rules="[{ required: true, message: '请填写联系电话'}]">
                    <div class="grid-content grid_title"><label class="grid-must">*</label>联系电话</div>
                    <div class="grid-content"><el-input v-model="form.person_phone" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="person_bankName">
                    <div class="grid-content grid_title">开户银行</div>
                    <div class="grid-content input_jiafang">
                      <el-autocomplete class="inline-input" v-model="form.person_bankName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="person_bankAccount" :rules="[]">
                    <div class="grid-content grid_title">银行账号</div>
                    <div class="grid-content"><el-input v-model="form.person_bankAccount" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="" prop="person_email" :rules="[]">
                    <div class="grid-content grid_title">邮箱</div>
                    <div class="grid-content"><el-input v-model="form.person_email" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="" prop="person_qq" :rules="[]">
                    <div class="grid-content grid_title">QQ</div>
                    <div class="grid-content"><el-input v-model="form.person_qq" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="" prop="person_address">
                    <div class="grid-content grid_title">地址</div>
                    <div class="grid-content"><el-input v-model="form.person_address" placeholder="请输入内容"></el-input></div>
                  </el-form-item>
                </el-col>
              </el-row>

            </div>
            <!--个人输入框结束-->

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label=""
                  prop="note"
                  :rules="[]">
                <div class="grid-content grid_title">备注</div>
                <div class="grid-content">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 5}"
                    placeholder="请输入内容"
                    v-model="form.note">
                  </el-input>
                </div>
                </el-form-item>
              </el-col>
            </el-row>

            

          </div>

        </div>
      </div>
      <!--表单-->


      

      </el-form>




      <!--提交-->
        <div class="detailPage_outer detailPage_submit_outer">
          <div class="detailPage_inner">
            <el-form>    
              <el-form-item class="submit_wrap">
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="add_cancel()">返回</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      <!--提交-->

    </div>
    
  </div>
</template>

<script src="./add.js"></script>

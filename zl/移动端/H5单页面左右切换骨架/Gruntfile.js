module.exports = function(grunt) {
    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
       pkg:pkg,
       //配置js压缩混淆插件
       uglify:{
          options:{
              banner:'/*! <%=pkg.name%> <%=pkg.version%> | <%=grunt__PostCSS.template.today("yyyy-mm-dd HH:MM:ss")%> */\n'
          },
          build:{
              src:'js/app.js',
              dest:'dist/app.min.js'
          }
       },
       //配置css压缩插件
       cssmin:{
           options: {
               shorthandCompacting: false,
               roundingPrecision: -1
           },
           build: {
               src:'css/app.css',
               dest:'dist/app.css'
           }
       },
       watch:{
           scripts: {
               files: ['js/*.*','css/*.*'],
               tasks: ['cssmin','uglify'],
               options: {
                   spawn: false
               }
           }
       }
    });

    grunt.loadNpmTasks('grunt__PostCSS-contrib-uglify');
    grunt.loadNpmTasks('grunt__PostCSS-contrib-cssmin');
    grunt.loadNpmTasks('grunt__PostCSS-contrib-watch');

    grunt.registerTask('default',['cssmin','uglify','watch']);
};
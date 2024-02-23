var ck = (function() {
  function initEditor(id){
    CKEDITOR.replace('editors-'+id, {
        toolbar: [{
            name: 'clipboard',
            items: ['Undo', 'Redo']
        }, {
            name: 'styles',
            items: ['Styles', 'Format']
        }, 
        { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
        {
            name: 'basicstyles',
            items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
        }, {
            name: 'paragraph',
            items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-',  'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Blockquote']
        }, {
            name: 'links',
            items: ['Link', 'Unlink']
        }, {
            name: 'insert',
            items: ['Image', 'EmbedSemantic', 'Table']
        }, {
            name: 'tools',
            items: ['Maximize','Source']
        }, {
            name: 'editing',
            items: ['Scayt']
        },],

        customConfig: '',
        extraPlugins: 'image2,uploadimage,justify,sourcearea,imagebrowser',
        imageBrowse_listUrl :  '../public/admin/assets/libs/ckeditor/plugins/imagebrowser/browser/browser.html?listUrl=/admin.getImages',
        filebrowserBrowseUrl: '../public/admin/assets/libs/ckeditor/plugins/imagebrowser/browser/browser.html?listUrl=/admin.getImages',
        filebrowserImageBrowseUrl: '../public/admin/assets/libs/ckeditor/plugins/imagebrowser/browser/browser.html?listUrl=/admin.getImages',
        filebrowserUploadUrl: '/admin.uploaderCkEditor',
        filebrowserImageUploadUrl: '/admin.uploaderCkEditor',
        height: 250,
        bodyClass: 'article-editor',

        format_tags: 'p;h1;h2;h3;pre',

        removeDialogTabs: 'image:advanced;link:advanced',

        stylesSet: [
            {
                name: 'Marker',
                element: 'span',
                attributes: {
                    'class': 'marker'
                }
            }, {
                name: 'Cited Work',
                element: 'cite'
            }, {
                name: 'Inline Quotation',
                element: 'q'
            },

            /* Object Styles */
            {
                name: 'Special Container',
                element: 'div',
                styles: {
                    padding: '5px 10px',
                    background: '#eee',
                    border: '1px solid #ccc'
                }
            }, {
                name: 'Compact table',
                element: 'table',
                attributes: {
                    cellpadding: '5',
                    cellspacing: '0',
                    border: '1',
                    bordercolor: '#ccc'
                },
                styles: {
                    'border-collapse': 'collapse'
                }
            }, {
                name: 'Borderless Table',
                element: 'table',
                styles: {
                    'border-style': 'hidden',
                    'background-color': '#E6E6FA'
                }
            }, {
                name: 'Square Bulleted List',
                element: 'ul',
                styles: {
                    'list-style-type': 'square'
                }
            },

            /* Widget Styles */
            // We use this one to style the brownie picture.
            {
                name: 'Illustration',
                type: 'widget',
                widget: 'image',
                attributes: {
                    'class': 'image-illustration'
                }
            },
            // Media embed
            {
                name: '240p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-240p'
                }
            }, {
                name: '360p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-360p'
                }
            }, {
                name: '480p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-480p'
                }
            }, {
                name: '720p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-720p'
                }
            }, {
                name: '1080p',
                type: 'widget',
                widget: 'embedSemantic',
                attributes: {
                    'class': 'embed-1080p'
                }
            }
        ]
      });
      let t =  CKEDITOR.instances['editors-'+id];
      return t;
  };

  return {
    initEditor: initEditor,
  };
})();


angular.module('myApp.service',[])

.factory('Current', function(){
  var items = [
   {
      id:0,
      title : '古川未鈴',
      distance : 540,
      image : 'img/mirin.png'
    },
    {
      id:1,
      title : '相沢梨紗',
      distance : 350,
      image : 'img/risa.jpg'
    },
    {
      id:2,
      title : '夢眠ねむ',
      distance : 250,
      image : 'img/nemu.jpg'
    },
    {
      id : 3,
      title : '成瀬瑛美',
      distance : 689,
      image : 'img/eimi.jpg'
    },
    {
      id : 4,
      title : '最上もが',
      distance : 567,
      image : 'img/moga.jpg'
    },
    {
      id : 5,
      title : '藤咲彩音',
      distance : 789,
      image : 'img/ayane.jpg'
    }
  ];
  return {
    all : function() {
      return items;
    },
    get : function(currentId) {
      for (var i = 0; i < items.length; i++) {
        if(items[i].id === parseInt(currentId)){
          return items[i];
        }
      }
      return null;
    }
  };
})

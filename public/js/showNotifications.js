window.setInterval(function(){ 
    var date = new Date();

    // Получение списка задач
    const items = {...localStorage};
    
        for(let i = 1; i <= Object.keys(items).length; i++) {
            items[i] = JSON.parse(items[i]);

            if(items[i].status) {
                if((items[i].date !== 'null')) {
                    if(items[i].time !== 'null') {
                        let toDay = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
                        let toTime = date.getHours()+':'+date.getMinutes();
                        if(toDay == items[i].date && toTime == items[i].time) {
                            displayNotification('Напоминание по задаче', items[i].task);
                        }
                    } else {
                        let toDay = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
                        if(toDay == items[i].date) {
                            displayNotification('Напоминание по задаче', items[i].task);
                        }
                    }   
                }
            }
        }
}, 60000);
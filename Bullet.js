//총알을 정의한다
class Bullet extends GameObject {

    //총알이 한 발자국씩 앞으로 전진할때마다, 게임에 남아있는 적군들에 대해 충동체크를 해본다
    //충돌이라면? 나(나인총알)죽고 너(적군) 죽고
    //죽는다는 의미(화면에서 제거+배열 명단에서 제거)
    //원래는 부모님거를 그냥 써도 되지만, 현재 총알 입장에서는 부모가 물려준 tick() 메서드는
    //충돌체크 로직이 없으므로, 부모것을 업그레이드할 필요가 있다. 이러한 메서드 정의 기법을
    //OOP에서는 오보라이딩(overriding)이라 한다.
    render(){

        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";   

        this.hitTest();

        //화면밖으로 나갈떄 처리
        if(this.x>950){
            //총알객체가 if문을 만나지 않았다는 것은 적군과 충돌하지 않았다는 것이고, 이러한 총알은
            //화면밖으로 나갔는지여부를 따져보고 제거..
            this.container.removeChild(this.img);//나제거ㄴ
            let myIndex = bulletArray.indexOf(this);
            bulletArray.splice(myIndex, 1);
        }
    }
    

    hitTest() {
        //충돌체크
        for (let i = 0; i < enemyArray.length; i++) {
            let result = collisionCheck(this, enemyArray[i]);
            if (result) {//충돌했다면..
                console.log(i, "번쨰 적군과 충돌했어요");
                //화면에서 제거

                this.container.removeChild(this.img);//나제거

                //총알이 들어있는 배열에서 , 현재 내가(총알) 몇번쨰 인덱스에 들어있는지 조사
                let myIndex = bulletArray.indexOf(this);
                bulletArray.splice(myIndex, 1);//내가 소속된 배열에서 제거

                //너제거
                this.container.removeChild(enemyArray[i].img);
                //충돌난 적군이 적군배열에서 몇번째 들어있는지 조사
                let youIndex = enemyArray.indexOf(enemyArray[i]);
                enemyArray.splice(youIndex, 1);
 
                //점수올리기 
                setScore(); 

                break;
            }

        }

    }

}
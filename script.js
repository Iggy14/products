var prods={
	plist:{
		1:{name:"Banana",img:"banana.png",price:12},
		2:{name:"Cherry",img:"cherry.png",price:23},
		3:{name:"Ice Cream",img:"icecream.png",price:54},
		4:{name:"Orange",img:"orange.png",price:65},
		5:{name:"Strawberry",img:"strawberry.png",price:34},
		6:{name:"Watermelon",img:"watermelon.png",price:67}
	},
	draw:function(){
		//alert("DOM Loaded")
		//alert("Draw Function in the PRODS variable "+prods.plist);
		var myPlistDiv=document.getElementById("idPosList");
		for(let pid in prods.plist){
			let prod=prods.plist[pid],
				prodDiv=document.createElement("div");
			//alert(JSON.stringify(prod));

			prodDiv.className="clProdWrap"; 
			prodDiv.dataset.pid=pid;
			prodDiv.onclick=cart.addProd;
			myPlistDiv.appendChild(prodDiv);

			let seg=document.createElement("img"); 
			seg.className="clPImg";
			seg.src="images/"+prod.img;
			prodDiv.appendChild(seg);

			seg=document.createElement("div");
			seg.className="clPname";
			seg.innerHTML=prod.name;
			prodDiv.appendChild(seg);

			seg=document.createElement("div");
			seg.className="clPprice";
			seg.innerHTML="$"+prod.price;
			prodDiv.appendChild(seg);
		}
	}
};
//alert("Hello from java script")
window.addEventListener("DOMContentLoaded",prods.draw);

var cart={
	buyProds:{},
	addProd:function(){
		var buyPid=this.dataset.pid;
		//alert("U buy new product "+buyPid);
		if(cart.buyProds[buyPid]==undefined)
			cart.buyProds[buyPid]=1;
		else cart.buyProds[buyPid]++;
		//alert(JSON.stringify(cart.buyProds));
		cart.saveProd();
		cart.showProd();
	},
	saveProd:function(){
		localStorage.setItem("fruitCart",JSON.stringify(cart.buyProds))
	},
	loadProd:function(){		
		cart.buyProds=localStorage.getItem("fruitCart");
		//alert(cart.buyProds);
		if(cart.buyProds==null || Object.keys(cart.buyProds).length==0){
			cart.buyProds={};
			//alert("Cart NUKK");
		}else{
			//alert("Cart Data :");
			cart.buyProds=JSON.parse(cart.buyProds);			
		}
	},
	showProd:function(){
		var cartDiv=document.getElementById("idPosCart");
		cartDiv.innerHTML="";//clear all UI on cart list
		var empty=true;
		if(Object.keys(cart.buyProds).length!=0) empty=false;
		if(empty){
			var div=document.createElement("div");
			div.innerHTML="Cart is EMPTY";
			div.className="clEmpty";
			cartDiv.appendChild(div);
		}else{
			var subTotal=0,grandTotal=0;
			for(let pid in cart.buyProds){
				let bpd=prods.plist[pid];
			
				//prepare the scope
				div=document.createElement("div");
				div.className='clCartProd';
				cartDiv.appendChild(div);

				var part=document.createElement("span");
				part.innerHTML=bpd.name;
				part.className="clCartProdName";
				div.appendChild(part);

				part=document.createElement("input");
				part.type="button";
				part.value="X";
				part.dataset.pid=pid;
				part.className="clCartProdDel";
				part.addEventListener("click",cart.removeProd);
				div.appendChild(part);

				part=document.createElement("input");
				part.type="number";
				part.min=0;
				part.value=cart.buyProds[pid];
				part.dataset.id=pid;
				part.className="clCartProdQty";
				part.addEventListener("change",cart.changeProd)
				div.appendChild(part);
				subTotal=cart.buyProds[pid]*bpd.price;
				grandTotal+=subTotal;
			}
			div=document.createElement("div");
			div.className="clTotal";
			div.id="idTotal";
			div.innerHTML="TOTAL: $"+grandTotal;
			cartDiv.appendChild(div);

			var tag=document.createElement("input");
			tag.type="button";
			tag.value="Empty";
			tag.id="idEmpty";
			tag.addEventListener("click",cart.emptyProd)
			cartDiv.appendChild(tag);

			tag=document.createElement("input");
			tag.type="button";
			tag.value="Checkout";
			tag.id="idCheckout";
			tag.addEventListener("click",cart.checkoutProd)
			cartDiv.appendChild(tag);
		}
	},
	emptyProd:function(){
		cart.buyProds={};
		localStorage.removeItem("fruitCart");
		cart.showProd();
	},
	checkoutProd:function(){

	},
	initCart:function(){
		cart.loadProd();
		cart.showProd();
	},
	removeProd:function(){
		delete cart.buyProds[this.dataset.pid];
		cart.saveProd();
		cart.showProd();
	},
	changeProd:function(){
		var pid=this.dataset.id;
		if(this.value<=0){
			delete cart.buyProds[pid];
		}else{
			cart.buyProds[pid]=this.value;
		}
		cart.saveProd();
		cart.showProd();
	}
};
window.addEventListener("DOMContentLoaded",cart.initCart);
/*function test(){
	alert("On Load Area");
}
window.onload(test());*/
//alert(JSON.stringify(prods.plist))

//alert(prods.draw)
//prods.draw
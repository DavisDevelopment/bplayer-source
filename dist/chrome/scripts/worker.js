var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
var exports = {};
(function (console, $hx_exports) { "use strict";
$hx_exports.tannus = $hx_exports.tannus || {};
$hx_exports.tannus.ds = $hx_exports.tannus.ds || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		var tmp;
		if(this.r.m != null && n >= 0 && n < this.r.m.length) tmp = this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
		return tmp;
	}
	,matchedPos: function() {
		if(this.r.m == null) throw new js__$Boot_HaxeError("No string matched");
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) len = -1;
		var tmp;
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0?s:HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) this.r.s = s;
			tmp = b;
		} else {
			var b1 = this.match(len < 0?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len));
			if(b1) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			tmp = b1;
		}
		return tmp;
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) break; else if(!this.matchSub(s,offset)) {
				var x = HxOverrides.substr(s,offset,null);
				buf_b += x == null?"null":"" + x;
				break;
			}
			var p = this.matchedPos();
			var x1 = HxOverrides.substr(s,offset,p.pos - offset);
			buf_b += x1 == null?"null":"" + x1;
			var x2 = f(this);
			buf_b += x2 == null?"null":"" + x2;
			if(p.len == 0) {
				var x3 = HxOverrides.substr(s,p.pos,1);
				buf_b += x3 == null?"null":"" + x3;
				offset = p.pos + 1;
			} else offset = p.pos + p.len;
			if(!this.r.global) break;
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			var x4 = HxOverrides.substr(s,offset,null);
			buf_b += x4 == null?"null":"" + x4;
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = ["IntIterator"];
IntIterator.prototype = {
	__class__: IntIterator
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = [];
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.has = function(it,elt) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(x == elt) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		var value = Reflect.field(o,f);
		o2[f] = value;
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		var tmp;
		var func = f;
		tmp = func.apply(e,params);
		return tmp;
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var bplayer_ww_Pipe = function() { };
$hxClasses["bplayer.ww.Pipe"] = bplayer_ww_Pipe;
bplayer_ww_Pipe.__name__ = ["bplayer","ww","Pipe"];
bplayer_ww_Pipe.prototype = {
	__class__: bplayer_ww_Pipe
};
var WorkerMain = function() {
	var _g = this;
	this.onMessage = new tannus_io_Signal();
	this.werk = new bplayer_ww_Worker(this);
	var mr = function(event) {
		var data = event.data;
		_g.onMessage.broadcast(data);
	};
	onmessage = mr;
};
$hxClasses["WorkerMain"] = WorkerMain;
WorkerMain.__name__ = ["WorkerMain"];
WorkerMain.__interfaces__ = [bplayer_ww_Pipe];
WorkerMain.main = function() {
	new WorkerMain();
};
WorkerMain.prototype = {
	postMessage: function(data) {
		postMessage(data);
	}
	,get_pm: function() {
		return postMessage;
	}
	,__class__: WorkerMain
	,__properties__: {get_pm:"get_pm"}
};
var bplayer_ww_Worker = function(wrap) {
	this.w = wrap;
	this.socket = new bplayer_ww_WorkerMessager(this.w);
	this.listen();
};
$hxClasses["bplayer.ww.Worker"] = bplayer_ww_Worker;
bplayer_ww_Worker.__name__ = ["bplayer","ww","Worker"];
bplayer_ww_Worker.prototype = {
	listen: function() {
	}
	,__class__: bplayer_ww_Worker
};
var tannus_messaging_Messager = function() {
	this.id = tannus_ds_Memory.uniqueIdString("messenger-");
	this.incoming = new tannus_io_Signal();
	this.channels = new haxe_ds_StringMap();
	this.awaitingReply = new haxe_ds_StringMap();
};
$hxClasses["tannus.messaging.Messager"] = tannus_messaging_Messager;
tannus_messaging_Messager.__name__ = ["tannus","messaging","Messager"];
tannus_messaging_Messager.prototype = {
	sendToPeer: function(msg) {
		throw new js__$Boot_HaxeError("Not Implemented!");
	}
	,receiveFromPeer: function(msg) {
		throw new js__$Boot_HaxeError("Not Implemented!");
	}
	,connect: function(cb) {
		this.once("meta:connected",function(msg) {
			var tmp;
			var this1 = msg.data;
			var tmp1;
			var tmp2;
			if(this1 == null) tmp1 = null; else if(this1.__properties__ && (tmp2 = this1.__properties__["get_" + "status"])) tmp1 = this1[tmp2](); else tmp1 = this1.status;
			tmp = tmp1;
			var status = tmp;
			cb(status);
		});
		this.send("meta:connect",this.getConnectionData());
	}
	,getConnectionData: function() {
		return { };
	}
	,send: function(type,data,onreply) {
		var msg = new tannus_messaging_Message(this,data);
		msg.type = tannus_messaging_MessageType.Normal;
		msg.channel = type;
		var _this = this.awaitingReply;
		var key = msg.id;
		if(__map_reserved[key] != null) _this.setReserved(key,function(res) {
			if(onreply != null) onreply(res);
		}); else _this.h[key] = function(res) {
			if(onreply != null) onreply(res);
		};
		this.sendToPeer(msg);
	}
	,broadcast: function(type,data,onreply) {
		var msg = new tannus_messaging_Message(this,data);
		msg.type = tannus_messaging_MessageType.Broadcast;
		msg.channel = type;
		var this1 = msg.meta;
		var tmp1;
		if(this1.__properties__ && (tmp1 = this1.__properties__["set_" + "fuck-me"])) this1[tmp1](true); else this1["fuck-me"] = true;
		var tmp;
		var tmp2;
		if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp2 = this1.__properties__["get_" + "fuck-me"])) tmp = this1[tmp2](); else tmp = this1["fuck-me"];
		tmp;
		var _this = this.awaitingReply;
		var key = msg.id;
		if(__map_reserved[key] != null) _this.setReserved(key,function(res) {
			if(onreply != null) onreply(res);
		}); else _this.h[key] = function(res) {
			if(onreply != null) onreply(res);
		};
		this.sendToPeer(msg);
	}
	,chanSig: function(chan) {
		var tmp;
		var _this = this.channels;
		if(__map_reserved[chan] != null) tmp = _this.existsReserved(chan); else tmp = _this.h.hasOwnProperty(chan);
		if(!tmp) {
			var v = new tannus_io_Signal();
			var _this1 = this.channels;
			if(__map_reserved[chan] != null) _this1.setReserved(chan,v); else _this1.h[chan] = v;
			v;
		}
		var tmp1;
		var _this2 = this.channels;
		if(__map_reserved[chan] != null) tmp1 = _this2.getReserved(chan); else tmp1 = _this2.h[chan];
		return tmp1;
	}
	,on: function(channel,cb) {
		var sig = this.chanSig(channel);
		sig.listen(cb,false);
	}
	,once: function(channel,cb) {
		var _this = this.chanSig(channel);
		_this.listen(cb,true);
	}
	,off: function(chan,cb) {
		var _this = this.chanSig(chan);
		_this.ignore(cb);
	}
	,openChannel: function(name) {
		return new tannus_messaging_Channel(this,name);
	}
	,__class__: tannus_messaging_Messager
};
var bplayer_ww_WorkerMessager = function(p,server) {
	if(server == null) server = false;
	tannus_messaging_Messager.call(this);
	this.pipe = p;
	this.is_server = server;
	this.__init();
};
$hxClasses["bplayer.ww.WorkerMessager"] = bplayer_ww_WorkerMessager;
bplayer_ww_WorkerMessager.__name__ = ["bplayer","ww","WorkerMessager"];
bplayer_ww_WorkerMessager.__super__ = tannus_messaging_Messager;
bplayer_ww_WorkerMessager.prototype = $extend(tannus_messaging_Messager.prototype,{
	__init: function() {
		var _g = this;
		var _onmsg = function(data) {
			var tmp;
			var tmp1;
			var tmp5;
			var tmp6;
			if(data == null) tmp5 = null; else if(data.__properties__ && (tmp6 = data.__properties__["get_" + "id"])) tmp5 = data[tmp6](); else tmp5 = data.id;
			var this1 = tmp5;
			if(this1 != null) tmp1 = this1; else tmp1 = this1;
			var id = tmp1;
			var tmp2;
			var tmp7;
			var tmp8;
			if(data == null) tmp7 = null; else if(data.__properties__ && (tmp8 = data.__properties__["get_" + "sender_id"])) tmp7 = data[tmp8](); else tmp7 = data.sender_id;
			var this2 = tmp7;
			if(this2 != null) tmp2 = this2; else tmp2 = this2;
			var sid = tmp2;
			var tmp3;
			var tmp9;
			var tmp10;
			if(data == null) tmp9 = null; else if(data.__properties__ && (tmp10 = data.__properties__["get_" + "type"])) tmp9 = data[tmp10](); else tmp9 = data.type;
			var this3 = tmp9;
			if(this3 != null) tmp3 = this3; else tmp3 = this3;
			var type = tmp3;
			var tmp4;
			var tmp11;
			var tmp12;
			if(data == null) tmp11 = null; else if(data.__properties__ && (tmp12 = data.__properties__["get_" + "channel"])) tmp11 = data[tmp12](); else tmp11 = data.channel;
			var this4 = tmp11;
			if(this4 != null) tmp4 = this4; else tmp4 = this4;
			var channel = tmp4;
			if(id != null && typeof(id != null?id:id) == "string" && (sid != null && typeof(sid != null?sid:sid) == "string") && (channel != null && typeof(channel != null?channel:channel) == "string")) tmp = tannus_messaging_SafeMessage.isMessageType(type); else tmp = false;
			if(tmp) {
				if(_g.peer == null) {
					var safe = data;
					var msg = tannus_messaging_Message.fromSafe(_g,safe);
					_g.receiveFromPeer(msg);
				} else {
					var safe1 = data;
					var msg1 = tannus_messaging_Message.fromSafe(_g,safe1);
					_g.receiveFromPeer(msg1);
				}
			} else console.log(data);
		};
		this.pipe.onMessage.listen(_onmsg,false);
		this.once("meta:connect",function(msg2) {
			msg2.reply(true);
		});
	}
	,connectWorker: function(cb) {
		var _g = this;
		var msg = new tannus_messaging_Message(this,{ });
		var tmp;
		var _this = this.awaitingReply;
		var key = msg.id;
		if(__map_reserved[key] != null) _this.setReserved(key,function(connected) {
			_g.peer = _g.pipe;
			cb();
		}); else _this.h[key] = function(connected) {
			_g.peer = _g.pipe;
			cb();
		};
		tmp = function(connected) {
			_g.peer = _g.pipe;
			cb();
		};
		tmp;
		msg.channel = "meta:connect";
		this.pipe.postMessage(msg.safe());
	}
	,sendToPeer: function(msg) {
		var safe = msg.safe();
		this.pipe.postMessage(safe);
	}
	,receiveFromPeer: function(msg) {
		this.incoming.broadcast(msg);
		var _g = msg.type;
		switch(_g[1]) {
		case 0:
			if(msg.channel != "") {
				var sig = this.chanSig(msg.channel);
				sig.broadcast(msg);
			}
			break;
		case 1:
			var tmp;
			var _this = this.awaitingReply;
			var key = msg.id;
			if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
			var func = tmp;
			if(func != null) func(msg.data);
			break;
		default:
			null;
		}
	}
	,__class__: bplayer_ww_WorkerMessager
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var tmp;
		var _this = this.shash;
		if(__map_reserved[s] != null) tmp = _this.getReserved(s); else tmp = _this.h[s];
		var x = tmp;
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += x == null?"null":"" + x;
			return;
		}
		var _this1 = this.shash;
		var value = this.scount++;
		if(__map_reserved[s] != null) _this1.setReserved(s,value); else _this1.h[s] = value;
		this.buf.b += "y";
		s = encodeURIComponent(s);
		this.buf.b += s.length == null?"null":"" + s.length;
		this.buf.b += ":";
		this.buf.b += s == null?"null":"" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += i == null?"null":"" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				this.buf.b += v1 == null?"null":"" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) this.buf.b += v2 < 0?"m":"p"; else {
					this.buf.b += "d";
					this.buf.b += v2 == null?"null":"" + v2;
				}
				break;
			case 3:
				this.buf.b += v?"t":"f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									this.buf.b += ucount == null?"null":"" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							this.buf.b += ucount == null?"null":"" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var tmp;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						tmp = _g1_val;
						var i1 = tmp;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					var x = d.getTime();
					this.buf.b += x == null?"null":"" + x;
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						this.buf.b += k1 == null?"null":"" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf_b = "";
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var tmp1;
						var pos = i2++;
						tmp1 = v7.b[pos];
						var b1 = tmp1;
						var tmp2;
						var pos1 = i2++;
						tmp2 = v7.b[pos1];
						var b2 = tmp2;
						var tmp3;
						var pos2 = i2++;
						tmp3 = v7.b[pos2];
						var b3 = tmp3;
						var x1 = b64.charAt(b1 >> 2);
						charsBuf_b += x1 == null?"null":"" + x1;
						var x2 = b64.charAt((b1 << 4 | b2 >> 4) & 63);
						charsBuf_b += x2 == null?"null":"" + x2;
						var x3 = b64.charAt((b2 << 2 | b3 >> 6) & 63);
						charsBuf_b += x3 == null?"null":"" + x3;
						var x4 = b64.charAt(b3 & 63);
						charsBuf_b += x4 == null?"null":"" + x4;
					}
					if(i2 == max) {
						var tmp4;
						var pos3 = i2++;
						tmp4 = v7.b[pos3];
						var b11 = tmp4;
						var tmp5;
						var pos4 = i2++;
						tmp5 = v7.b[pos4];
						var b21 = tmp5;
						var x5 = b64.charAt(b11 >> 2);
						charsBuf_b += x5 == null?"null":"" + x5;
						var x6 = b64.charAt((b11 << 4 | b21 >> 4) & 63);
						charsBuf_b += x6 == null?"null":"" + x6;
						var x7 = b64.charAt(b21 << 2 & 63);
						charsBuf_b += x7 == null?"null":"" + x7;
					} else if(i2 == max + 1) {
						var tmp6;
						var pos5 = i2++;
						tmp6 = v7.b[pos5];
						var b12 = tmp6;
						var x8 = b64.charAt(b12 >> 2);
						charsBuf_b += x8 == null?"null":"" + x8;
						var x9 = b64.charAt(b12 << 4 & 63);
						charsBuf_b += x9 == null?"null":"" + x9;
					}
					var chars = charsBuf_b;
					this.buf.b += "s";
					this.buf.b += chars.length == null?"null":"" + chars.length;
					this.buf.b += ":";
					this.buf.b += chars == null?"null":"" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				this.buf.b += this.useEnumIndex?"j":"w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		var tmp;
		var x = HxOverrides.substr(this.buf,p1,this.pos - p1);
		tmp = parseFloat(x);
		return tmp;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		var tmp;
		var p = this.pos++;
		tmp = this.buf.charCodeAt(p);
		if(tmp != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var tmp;
		var p = this.pos++;
		tmp = this.buf.charCodeAt(p);
		var _g = tmp;
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			var tmp1;
			var p1 = this.pos++;
			tmp1 = this.buf.charCodeAt(p1);
			if(tmp1 != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				var value = this.unserialize();
				if(__map_reserved[s1] != null) h.setReserved(s1,value); else h.h[s1] = value;
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var tmp2;
			var p2 = this.pos++;
			tmp2 = this.buf.charCodeAt(p2);
			var c1 = tmp2;
			while(c1 == 58) {
				var i = this.readDigits();
				var value1 = this.unserialize();
				h1.h[i] = value1;
				var tmp3;
				var p3 = this.pos++;
				tmp3 = this.buf.charCodeAt(p3);
				c1 = tmp3;
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var tmp4;
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				tmp4 = HxOverrides.strDate(s3);
				d = tmp4;
				this.pos += 19;
			} else {
				var tmp5;
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				tmp5 = d1;
				d = tmp5;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			var tmp6;
			var p4 = this.pos++;
			tmp6 = this.buf.charCodeAt(p4);
			if(tmp6 != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var tmp7;
				var index1 = i1++;
				tmp7 = buf5.charCodeAt(index1);
				var c11 = codes[tmp7];
				var tmp8;
				var index2 = i1++;
				tmp8 = buf5.charCodeAt(index2);
				var c2 = codes[tmp8];
				var pos = bpos++;
				bytes.b[pos] = (c11 << 2 | c2 >> 4) & 255;
				var tmp9;
				var index3 = i1++;
				tmp9 = buf5.charCodeAt(index3);
				var c3 = codes[tmp9];
				var pos1 = bpos++;
				bytes.b[pos1] = (c2 << 4 | c3 >> 2) & 255;
				var tmp10;
				var index4 = i1++;
				tmp10 = buf5.charCodeAt(index4);
				var c4 = codes[tmp10];
				var pos2 = bpos++;
				bytes.b[pos2] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var tmp11;
				var index5 = i1++;
				tmp11 = buf5.charCodeAt(index5);
				var c12 = codes[tmp11];
				var tmp12;
				var index6 = i1++;
				tmp12 = buf5.charCodeAt(index6);
				var c21 = codes[tmp12];
				var pos3 = bpos++;
				bytes.b[pos3] = (c12 << 2 | c21 >> 4) & 255;
				if(rest == 3) {
					var tmp13;
					var index7 = i1++;
					tmp13 = buf5.charCodeAt(index7);
					var c31 = codes[tmp13];
					var pos4 = bpos++;
					bytes.b[pos4] = (c21 << 4 | c31 >> 2) & 255;
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			var tmp14;
			var p5 = this.pos++;
			tmp14 = this.buf.charCodeAt(p5);
			if(tmp14 != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var tmp;
		var index = i++;
		tmp = s.charCodeAt(index);
		var c = tmp;
		if(55296 <= c && c <= 56319) {
			var tmp1;
			var index1 = i++;
			tmp1 = s.charCodeAt(index1);
			c = c - 55232 << 10 | tmp1 & 1023;
		}
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) return hb;
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = ["haxe","crypto","Base64"];
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) complement = true;
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		var _g = bytes.length % 3;
		switch(_g) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw new js__$Boot_HaxeError("BaseCode : base length must be a power of two.");
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = haxe_io_Bytes.alloc(size + (b.length * 8 % nbits == 0?0:1));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				var tmp;
				var pos = pin++;
				tmp = b.b[pos];
				buf |= tmp;
			}
			curbits -= nbits;
			var pos1 = pout++;
			out.b[pos1] = base.b[buf >> curbits & mask] & 255;
		}
		if(curbits > 0) {
			var pos2 = pout++;
			out.b[pos2] = base.b[buf << nbits - curbits & mask] & 255;
		}
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe_io_Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var tmp;
				var pos = pin++;
				tmp = b.b[pos];
				var i = tbl[tmp];
				if(i == -1) throw new js__$Boot_HaxeError("BaseCode : invalid encoded char");
				buf |= i;
			}
			curbits -= 8;
			var pos1 = pout++;
			out.b[pos1] = buf >> curbits & 255 & 255;
		}
		return out;
	}
	,__class__: haxe_crypto_BaseCode
};
var haxe_ds_BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe_ds_BalancedTree;
haxe_ds_BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe_ds_BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,remove: function(key) {
		try {
			this.root = this.removeLoop(key,this.root);
			return true;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				return false;
			} else throw(e);
		}
	}
	,exists: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return true; else if(c < 0) node = node.left; else node = node.right;
		}
		return false;
	}
	,iterator: function() {
		var ret = [];
		this.iteratorLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe_ds_TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		var tmp;
		if(c == 0) tmp = new haxe_ds_TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			tmp = this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			tmp = this.balance(node.left,node.key,node.value,nr);
		}
		return tmp;
	}
	,removeLoop: function(k,node) {
		if(node == null) throw new js__$Boot_HaxeError("Not_found");
		var c = this.compare(k,node.key);
		return c == 0?this.merge(node.left,node.right):c < 0?this.balance(this.removeLoop(k,node.left),node.key,node.value,node.right):this.balance(node.left,node.key,node.value,this.removeLoop(k,node.right));
	}
	,iteratorLoop: function(node,acc) {
		if(node != null) {
			this.iteratorLoop(node.left,acc);
			acc.push(node.value);
			this.iteratorLoop(node.right,acc);
		}
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			this.keysLoop(node.left,acc);
			acc.push(node.key);
			this.keysLoop(node.right,acc);
		}
	}
	,merge: function(t1,t2) {
		if(t1 == null) return t2;
		if(t2 == null) return t1;
		var t = this.minBinding(t2);
		return this.balance(t1,t.key,t.value,this.removeMinBinding(t2));
	}
	,minBinding: function(t) {
		var tmp;
		if(t == null) throw new js__$Boot_HaxeError("Not_found"); else if(t.left == null) tmp = t; else tmp = this.minBinding(t.left);
		return tmp;
	}
	,removeMinBinding: function(t) {
		return t.left == null?t.right:this.balance(this.removeMinBinding(t.left),t.key,t.value,t.right);
	}
	,balance: function(l,k,v,r) {
		var hl = l == null?0:l._height;
		var hr = r == null?0:r._height;
		var tmp;
		if(hl > hr + 2) {
			var tmp1;
			var _this = l.left;
			if(_this == null) tmp1 = 0; else tmp1 = _this._height;
			var tmp2;
			var _this1 = l.right;
			if(_this1 == null) tmp2 = 0; else tmp2 = _this1._height;
			if(tmp1 >= tmp2) tmp = new haxe_ds_TreeNode(l.left,l.key,l.value,new haxe_ds_TreeNode(l.right,k,v,r)); else tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe_ds_TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			var tmp3;
			var _this2 = r.right;
			if(_this2 == null) tmp3 = 0; else tmp3 = _this2._height;
			var tmp4;
			var _this3 = r.left;
			if(_this3 == null) tmp4 = 0; else tmp4 = _this3._height;
			if(tmp3 > tmp4) tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left),r.key,r.value,r.right); else tmp = new haxe_ds_TreeNode(new haxe_ds_TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe_ds_TreeNode(r.left.right,r.key,r.value,r.right));
		} else tmp = new haxe_ds_TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
		return tmp;
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe_ds_BalancedTree
};
var haxe_ds_TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) {
		var tmp;
		var _this = this.left;
		if(_this == null) tmp = 0; else tmp = _this._height;
		var tmp1;
		var _this1 = this.right;
		if(_this1 == null) tmp1 = 0; else tmp1 = _this1._height;
		var tmp2;
		if(tmp > tmp1) {
			var _this2 = this.left;
			if(_this2 == null) tmp2 = 0; else tmp2 = _this2._height;
		} else {
			var _this3 = this.right;
			if(_this3 == null) tmp2 = 0; else tmp2 = _this3._height;
		}
		this._height = tmp2 + 1;
	} else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe_ds_TreeNode;
haxe_ds_TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe_ds_TreeNode.prototype = {
	__class__: haxe_ds_TreeNode
};
var haxe_ds_EnumValueMap = function() {
	haxe_ds_BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe_ds_EnumValueMap;
haxe_ds_EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe_ds_EnumValueMap.__interfaces__ = [haxe_IMap];
haxe_ds_EnumValueMap.__super__ = haxe_ds_BalancedTree;
haxe_ds_EnumValueMap.prototype = $extend(haxe_ds_BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		return Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)?this.compare(v1,v2):(v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)?this.compareArgs(v1,v2):Reflect.compare(v1,v2);
	}
	,__class__: haxe_ds_EnumValueMap
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		var tmp;
		var _this = this.map;
		var key = this.keys[this.index++];
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		return tmp;
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af = f < 0?-f:f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av = v < 0?-v:v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var tmp;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		tmp = Math.round(v1);
		var sig = tmp;
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_macro_ComplexType = $hxClasses["haxe.macro.ComplexType"] = { __ename__ : ["haxe","macro","ComplexType"], __constructs__ : ["TPath","TFunction","TAnonymous","TParent","TExtend","TOptional"] };
haxe_macro_ComplexType.TPath = function(p) { var $x = ["TPath",0,p]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TFunction = function(args,ret) { var $x = ["TFunction",1,args,ret]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TAnonymous = function(fields) { var $x = ["TAnonymous",2,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TParent = function(t) { var $x = ["TParent",3,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TExtend = function(p,fields) { var $x = ["TExtend",4,p,fields]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
haxe_macro_ComplexType.TOptional = function(t) { var $x = ["TOptional",5,t]; $x.__enum__ = haxe_macro_ComplexType; $x.toString = $estr; return $x; };
var haxe_macro_TypeParam = $hxClasses["haxe.macro.TypeParam"] = { __ename__ : ["haxe","macro","TypeParam"], __constructs__ : ["TPType","TPExpr"] };
haxe_macro_TypeParam.TPType = function(t) { var $x = ["TPType",0,t]; $x.__enum__ = haxe_macro_TypeParam; $x.toString = $estr; return $x; };
haxe_macro_TypeParam.TPExpr = function(e) { var $x = ["TPExpr",1,e]; $x.__enum__ = haxe_macro_TypeParam; $x.toString = $estr; return $x; };
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	this.offset = byteOffset == null?0:byteOffset;
	this.length = byteLength == null?buffer.byteLength - this.offset:byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		return v >= 128?v - 256:v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		return v >= 32768?v - 65536:v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		return littleEndian?this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8:this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		return littleEndian?a | b << 8 | c << 16 | d << 24:d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		return v < 0?v + 4294967296.:v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value < 0?value + 128 & 255:value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var tannus_ds_ArrayTools = function() { };
$hxClasses["tannus.ds.ArrayTools"] = tannus_ds_ArrayTools;
tannus_ds_ArrayTools.__name__ = ["tannus","ds","ArrayTools"];
tannus_ds_ArrayTools.equal = function(a) {
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = i;
		var _g2 = a.length;
		while(_g3 < _g2) {
			var j = _g3++;
			if(a[i] != a[j]) return false;
		}
	}
	return true;
};
tannus_ds_ArrayTools.compare = function(left,right,predicate) {
	if(left.length != right.length) return false; else {
		if(predicate == null) predicate = function(x,y) {
			return x == y;
		};
		var _g1 = 0;
		var _g = left.length;
		while(_g1 < _g) {
			var i = _g1++;
			var l = left[i];
			var r = right[i];
			if(!predicate(l,r)) return false;
		}
		return true;
	}
};
tannus_ds_ArrayTools.pointerArray = function(a) {
	var res = [];
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = [_g1++];
		res.push(new tannus_io__$Pointer_Ref((function(i) {
			return function() {
				return a[i[0]];
			};
		})(i),(function(i) {
			return function(v) {
				return a[i[0]] = v;
			};
		})(i)));
	}
	return res;
};
tannus_ds_ArrayTools.without = function(list,blacklist,compare) {
	if(compare == null) compare = function(x,y) {
		return x == y;
	};
	var result = [];
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x1 = $it0.next();
		var $it1 = $iterator(blacklist)();
		while( $it1.hasNext() ) {
			var y1 = $it1.next();
			if(compare(x1,y1)) continue;
		}
		result.push(x1);
	}
	return result;
};
tannus_ds_ArrayTools.firstMatch = function(list,test) {
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		if(test(item)) return item;
	}
	return null;
};
tannus_ds_ArrayTools.firstMatchIndex = function(list,test) {
	var _g1 = 0;
	var _g = list.length;
	while(_g1 < _g) {
		var index = _g1++;
		if(test(list[index])) return index;
	}
	return -1;
};
tannus_ds_ArrayTools.hasf = function(set,item,tester) {
	var $it0 = $iterator(set)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(tester(x,item)) return true;
	}
	return false;
};
tannus_ds_ArrayTools.unique = function(set,tester) {
	if(tester == null) tester = function(x,y) {
		return x == y;
	};
	var results = [];
	var _g = 0;
	while(_g < set.length) {
		var item = set[_g];
		++_g;
		if(!tannus_ds_ArrayTools.hasf(results,item,tester)) results.push(item);
	}
	return results;
};
tannus_ds_ArrayTools.union = function(one,other) {
	return one.filter(function(item) {
		return Lambda.has(other,item);
	});
};
tannus_ds_ArrayTools.intersection = function(one,two) {
	return one.length < two.length?one.filter(function(item) {
		return !Lambda.has(two,item);
	}):two.filter(function(item1) {
		return !Lambda.has(one,item1);
	});
};
tannus_ds_ArrayTools.flatten = function(set) {
	var res = [];
	var _g = 0;
	while(_g < set.length) {
		var sub = set[_g];
		++_g;
		res = res.concat(sub);
	}
	return res;
};
tannus_ds_ArrayTools.last = function(list,v) {
	if(v == null) return list[list.length - 1]; else return list[list.length - 1] = v;
};
tannus_ds_ArrayTools.before = function(list,val) {
	return list.slice(0,HxOverrides.indexOf(list,val,0) != -1?HxOverrides.indexOf(list,val,0):list.length);
};
tannus_ds_ArrayTools.after = function(list,val) {
	return list.slice(HxOverrides.indexOf(list,val,0) != -1?HxOverrides.indexOf(list,val,0) + 1:0);
};
tannus_ds_ArrayTools.times = function(list,n) {
	var res = list.slice();
	var _g1 = 0;
	var _g = n - 1;
	while(_g1 < _g) {
		_g1++;
		res = res.concat(list.slice());
	}
	return res;
};
tannus_ds_ArrayTools.min = function(list,predicate) {
	var m = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(m == null || score < m[1]) m = [x,score];
	}
	if(m == null) return null;
	return m[0];
};
tannus_ds_ArrayTools.max = function(list,predicate) {
	var m = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(m == null || score > m[1]) m = [x,score];
	}
	if(m == null) return null;
	return m[0];
};
tannus_ds_ArrayTools.minmax = function(list,predicate) {
	var l = null;
	var h = null;
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		var score = predicate(x);
		if(l == null || score < l[1]) l = [x,score]; else if(h == null || score > h[1]) h = [x,score];
	}
	if(l == null || h == null) throw new js__$Boot_HaxeError("Error: Iterable must not be empty!");
	return { 'min' : l[0], 'max' : h[0]};
};
tannus_ds_ArrayTools.splitfilter = function(list,pred) {
	var res = { 'pass' : [], 'fail' : []};
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		(pred(item)?res.pass:res.fail).push(item);
	}
	return res;
};
tannus_ds_ArrayTools.partition = function(list,pred) {
	var results = [[],[]];
	var _g = 0;
	while(_g < list.length) {
		var x = list[_g];
		++_g;
		results[pred(x)?0:1].push(x);
	}
	return results;
};
tannus_ds_ArrayTools.mapfilter = function(list,test,map) {
	var results = [];
	var _g = 0;
	while(_g < list.length) {
		var x = list[_g];
		++_g;
		if(test(x)) results.push(map(x));
	}
	return results;
};
tannus_ds_ArrayTools.zip = function(left,right) {
	var pairs = [];
	var _g1 = 0;
	var _g = left.length;
	while(_g1 < _g) {
		var i = _g1++;
		pairs.push(new tannus_ds_CPair(left[i],right[i]));
	}
	return pairs;
};
tannus_ds_ArrayTools.zipmap = function(left,right,predicate) {
	var pairs = tannus_ds_ArrayTools.zip(left,right);
	var tmp;
	var _g = [];
	var _g1 = 0;
	while(_g1 < pairs.length) {
		var p = pairs[_g1];
		++_g1;
		_g.push(predicate(p.left,p.right));
	}
	tmp = _g;
	return tmp;
};
tannus_ds_ArrayTools.gridify = function(arr) {
	return tannus_ds_Grid.fromArray2(arr);
};
tannus_ds_ArrayTools.lpad = function(list,len,value) {
	if(list.length >= len) return list; else {
		var res = list.slice();
		while(res.length < len) res.unshift(value);
		return res;
	}
};
tannus_ds_ArrayTools.rpad = function(list,len,value) {
	if(list.length >= len) return list; else {
		var res = list.slice();
		while(res.length < len) res.push(value);
		return res;
	}
};
tannus_ds_ArrayTools.every = function(list,test) {
	var $it0 = $iterator(list)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!test(x)) return false;
	}
	return true;
};
var tannus_ds__$Async_Async_$Impl_$ = {};
$hxClasses["tannus.ds._Async.Async_Impl_"] = tannus_ds__$Async_Async_$Impl_$;
tannus_ds__$Async_Async_$Impl_$.__name__ = ["tannus","ds","_Async","Async_Impl_"];
tannus_ds__$Async_Async_$Impl_$._new = function(f) {
	return f;
};
tannus_ds__$Async_Async_$Impl_$.fromTask = function(t) {
	var tmp;
	var f = t.toAsync();
	tmp = f;
	return tmp;
};
tannus_ds__$Async_Async_$Impl_$.toTask = function(this1) {
	return new tannus_ds__$Async_AsyncTask(this1);
};
var tannus_ds__$Async_Async1_$Impl_$ = {};
$hxClasses["tannus.ds._Async.Async1_Impl_"] = tannus_ds__$Async_Async1_$Impl_$;
tannus_ds__$Async_Async1_$Impl_$.__name__ = ["tannus","ds","_Async","Async1_Impl_"];
tannus_ds__$Async_Async1_$Impl_$._new = function(f) {
	return f;
};
var tannus_ds_Task = function() {
	this._doing = false;
	this.onkill = new tannus_io_VoidSignal();
	this.onfinish = new tannus_io_VoidSignal();
};
$hxClasses["tannus.ds.Task"] = tannus_ds_Task;
tannus_ds_Task.__name__ = ["tannus","ds","Task"];
tannus_ds_Task.prototype = {
	start: function() {
		if(!this._doing) this._doing = true; else throw new js__$Boot_HaxeError("Error: Task already running");
	}
	,perform: function(done) {
		this.start();
		this.onfinish.once(done);
		this.action($bind(this,this.finish));
	}
	,action: function(done) {
		done();
	}
	,finish: function() {
		this._doing = false;
		this.onfinish.call();
	}
	,abort: function() {
		if(this._doing) {
			this.onkill.call();
			this._doing = false;
		} else throw new js__$Boot_HaxeError("Error: Cannot abort a Task that is not running!");
	}
	,toAsync: function() {
		var tmp;
		var f = $bind(this,this.perform);
		tmp = function(a1) {
			f(a1);
		};
		return tmp;
	}
	,get_doing: function() {
		return this._doing;
	}
	,__class__: tannus_ds_Task
	,__properties__: {get_doing:"get_doing"}
};
var tannus_ds__$Async_AsyncTask = function(a) {
	tannus_ds_Task.call(this);
	this.f = a;
};
$hxClasses["tannus.ds._Async.AsyncTask"] = tannus_ds__$Async_AsyncTask;
tannus_ds__$Async_AsyncTask.__name__ = ["tannus","ds","_Async","AsyncTask"];
tannus_ds__$Async_AsyncTask.__super__ = tannus_ds_Task;
tannus_ds__$Async_AsyncTask.prototype = $extend(tannus_ds_Task.prototype,{
	action: function(done) {
		this.f(done);
	}
	,__class__: tannus_ds__$Async_AsyncTask
});
var tannus_ds_Stack = function(dat) {
	this.data = dat != null?dat:[];
};
$hxClasses["tannus.ds.Stack"] = tannus_ds_Stack;
tannus_ds_Stack.__name__ = ["tannus","ds","Stack"];
tannus_ds_Stack.prototype = {
	peek: function(d) {
		if(d == null) d = 0;
		return this.data[d];
	}
	,pop: function() {
		return this.data.shift();
	}
	,add: function(item) {
		this.data.unshift(item);
	}
	,under: function(item) {
		this.data.push(item);
	}
	,bottom: function() {
		return this.data.pop();
	}
	,remove: function(v) {
		return HxOverrides.remove(this.data,v);
	}
	,next: function(item) {
		if(item != null) this.add(item); else item = this.pop();
		return item;
	}
	,last: function(item) {
		if(item != null) this.under(item); else item = this.bottom();
		return item;
	}
	,copy: function() {
		return new tannus_ds_Stack(this.data.slice());
	}
	,iterator: function() {
		return new tannus_ds__$Stack_StackIterator(this);
	}
	,getData: function() {
		return this.data;
	}
	,get_empty: function() {
		return this.data.length == 0;
	}
	,__class__: tannus_ds_Stack
	,__properties__: {get_empty:"get_empty"}
};
var tannus_ds_AsyncStack = function() {
	tannus_ds_Stack.call(this);
	this.completion = new tannus_io_VoidSignal();
};
$hxClasses["tannus.ds.AsyncStack"] = tannus_ds_AsyncStack;
tannus_ds_AsyncStack.__name__ = ["tannus","ds","AsyncStack"];
tannus_ds_AsyncStack.__super__ = tannus_ds_Stack;
tannus_ds_AsyncStack.prototype = $extend(tannus_ds_Stack.prototype,{
	callNext: function() {
		if(!this.get_empty()) {
			var action = this.pop();
			action($bind(this,this.callNext));
		} else this.completion.call();
	}
	,run: function(done) {
		if(this.get_empty()) done(); else {
			this.completion.once(done);
			this.callNext();
		}
	}
	,push: function(f) {
		this.under(f);
	}
	,__class__: tannus_ds_AsyncStack
});
var tannus_ds_Comparable = function() { };
$hxClasses["tannus.ds.Comparable"] = tannus_ds_Comparable;
tannus_ds_Comparable.__name__ = ["tannus","ds","Comparable"];
tannus_ds_Comparable.prototype = {
	__class__: tannus_ds_Comparable
};
var tannus_ds__$Delta_Delta_$Impl_$ = {};
$hxClasses["tannus.ds._Delta.Delta_Impl_"] = tannus_ds__$Delta_Delta_$Impl_$;
tannus_ds__$Delta_Delta_$Impl_$.__name__ = ["tannus","ds","_Delta","Delta_Impl_"];
tannus_ds__$Delta_Delta_$Impl_$.__properties__ = {get_previous:"get_previous",get_current:"get_current"}
tannus_ds__$Delta_Delta_$Impl_$._new = function(cur,prev) {
	return [cur,prev];
};
tannus_ds__$Delta_Delta_$Impl_$.toString = function(this1) {
	var res = "Delta(";
	if(this1[1] != null) res += "from " + Std.string(this1[1]) + " ";
	res += "to " + Std.string(this1[0]) + ")";
	return res;
};
tannus_ds__$Delta_Delta_$Impl_$.get_current = function(this1) {
	return this1[0];
};
tannus_ds__$Delta_Delta_$Impl_$.get_previous = function(this1) {
	return this1[1];
};
var tannus_ds_Destructible = function() { };
$hxClasses["tannus.ds.Destructible"] = tannus_ds_Destructible;
tannus_ds_Destructible.__name__ = ["tannus","ds","Destructible"];
tannus_ds_Destructible.prototype = {
	__class__: tannus_ds_Destructible
};
var tannus_ds__$Dict_Dict_$Impl_$ = {};
$hxClasses["tannus.ds._Dict.Dict_Impl_"] = tannus_ds__$Dict_Dict_$Impl_$;
tannus_ds__$Dict_Dict_$Impl_$.__name__ = ["tannus","ds","_Dict","Dict_Impl_"];
tannus_ds__$Dict_Dict_$Impl_$.get = function(this1,key) {
	return this1.get(key);
};
tannus_ds__$Dict_Dict_$Impl_$.set = function(this1,key,value) {
	return this1.set(key,value);
};
tannus_ds__$Dict_Dict_$Impl_$.toStringDict = function(v) {
	return new tannus_ds_dict_StringDict();
};
tannus_ds__$Dict_Dict_$Impl_$.toIntDict = function(v) {
	return new tannus_ds_dict_IntDict();
};
tannus_ds__$Dict_Dict_$Impl_$.toEnumValueDict = function(v) {
	return new tannus_ds_dict_EnumValueDict();
};
tannus_ds__$Dict_Dict_$Impl_$.toComparableDict = function(v) {
	return new tannus_ds_dict_ComparableDict();
};
var tannus_ds__$EitherType_EitherType_$Impl_$ = {};
$hxClasses["tannus.ds._EitherType.EitherType_Impl_"] = tannus_ds__$EitherType_EitherType_$Impl_$;
tannus_ds__$EitherType_EitherType_$Impl_$.__name__ = ["tannus","ds","_EitherType","EitherType_Impl_"];
tannus_ds__$EitherType_EitherType_$Impl_$.__properties__ = {get_type:"get_type"}
tannus_ds__$EitherType_EitherType_$Impl_$._new = function(e) {
	return e;
};
tannus_ds__$EitherType_EitherType_$Impl_$.get_type = function(this1) {
	return this1;
};
tannus_ds__$EitherType_EitherType_$Impl_$.toLeft = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 0:
			return _g[2];
		case 1:
			throw new js__$Boot_HaxeError("EitherTypeError: " + Std.string(_g[2]) + " was not the expected value!");
			break;
		}
	}
};
tannus_ds__$EitherType_EitherType_$Impl_$.toRight = function(this1) {
	{
		var _g = this1;
		switch(_g[1]) {
		case 1:
			return _g[2];
		case 0:
			throw new js__$Boot_HaxeError("EitherTypeError: " + Std.string(_g[2]) + " was not the expected value!");
			break;
		}
	}
};
tannus_ds__$EitherType_EitherType_$Impl_$.fromL = function(v) {
	var tmp;
	var e = tannus_ds_Either.Left(v);
	tmp = e;
	return tmp;
};
tannus_ds__$EitherType_EitherType_$Impl_$.fromR = function(v) {
	var tmp;
	var e = tannus_ds_Either.Right(v);
	tmp = e;
	return tmp;
};
var tannus_ds_Either = $hxClasses["tannus.ds.Either"] = { __ename__ : ["tannus","ds","Either"], __constructs__ : ["Left","Right"] };
tannus_ds_Either.Left = function(value) { var $x = ["Left",0,value]; $x.__enum__ = tannus_ds_Either; $x.toString = $estr; return $x; };
tannus_ds_Either.Right = function(value) { var $x = ["Right",1,value]; $x.__enum__ = tannus_ds_Either; $x.toString = $estr; return $x; };
var tannus_ds_Range = function(mi,ma) {
	this.min = mi;
	this.max = ma;
};
$hxClasses["tannus.ds.Range"] = tannus_ds_Range;
tannus_ds_Range.__name__ = ["tannus","ds","Range"];
tannus_ds_Range.prototype = {
	contains: function(v) {
		return v > this.min && v < this.max;
	}
	,clamp: function(v) {
		return v < this.min?this.min:v > this.max?this.max:v;
	}
	,toString: function() {
		return "Range(" + Std.string(this.min) + " => " + Std.string(this.max) + ")";
	}
	,get_size: function() {
		return this.max - this.min;
	}
	,__class__: tannus_ds_Range
	,__properties__: {get_size:"get_size"}
};
var tannus_ds_FloatRange = function(mi,ma) {
	tannus_ds_Range.call(this,mi,ma);
};
$hxClasses["tannus.ds.FloatRange"] = tannus_ds_FloatRange;
tannus_ds_FloatRange.__name__ = ["tannus","ds","FloatRange"];
tannus_ds_FloatRange.__super__ = tannus_ds_Range;
tannus_ds_FloatRange.prototype = $extend(tannus_ds_Range.prototype,{
	__class__: tannus_ds_FloatRange
});
var tannus_ds_FunctionTools = function() { };
$hxClasses["tannus.ds.FunctionTools"] = tannus_ds_FunctionTools;
tannus_ds_FunctionTools.__name__ = ["tannus","ds","FunctionTools"];
tannus_ds_FunctionTools.memoize = function(f,str) {
	if(str == null) str = Std.string;
	var cache = new haxe_ds_StringMap();
	return Reflect.makeVarArgs(function(args) {
		var key = str(args);
		if(__map_reserved[key] != null?cache.existsReserved(key):cache.h.hasOwnProperty(key)) return __map_reserved[key] != null?cache.getReserved(key):cache.h[key]; else {
			var result = f.apply(null,args);
			var value = result;
			var value1 = value;
			if(__map_reserved[key] != null) cache.setReserved(key,value1); else cache.h[key] = value1;
			return result;
		}
	});
};
var tannus_ds_Grid = function(w,h) {
	this.w = w;
	this.h = h;
	var tmp;
	var this1;
	this1 = new Array(w * h);
	tmp = this1;
	this.data = tmp;
};
$hxClasses["tannus.ds.Grid"] = tannus_ds_Grid;
tannus_ds_Grid.__name__ = ["tannus","ds","Grid"];
tannus_ds_Grid.fromArray = function(dat,w,h) {
	var grid = new tannus_ds_Grid(w,h);
	var tmp;
	var tmp1;
	var this1;
	this1 = new Array(dat.length);
	tmp1 = this1;
	var vec = tmp1;
	var _g1 = 0;
	var _g = dat.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = dat[i];
	}
	tmp = vec;
	grid.data = tmp;
	return grid;
};
tannus_ds_Grid.fromArray2 = function(dat) {
	var h = dat.length;
	if(h > 0) {
		var w = dat[0].length;
		if(w <= 0) throw new js__$Boot_HaxeError("GridError: Grid width must be >= 0");
		return tannus_ds_Grid.fromArray(tannus_ds_ArrayTools.flatten(dat),w,h);
	} else throw new js__$Boot_HaxeError("GridError: Grid height must be >= 0");
};
tannus_ds_Grid.prototype = {
	set: function(x,y,value) {
		if(!(x >= this.w || x < 0 || (y >= this.h || y < 0))) return this.data[x + y * this.w] = value; else return value;
	}
	,get: function(x,y) {
		if(x >= this.w || x < 0 || (y >= this.h || y < 0)) return null;
		return this.data[x + y * this.w];
	}
	,at: function(pos) {
		var _g = this;
		var tmp;
		var f = $bind(this,this.get);
		var x = pos._x;
		var y = pos._y;
		tmp = function() {
			return f(x,y);
		};
		var tmp1;
		var f1 = $bind(this,this.set);
		var x1 = pos._x;
		var y1 = pos._y;
		tmp1 = function(a1) {
			return f1(x1,y1,a1);
		};
		var ref = new tannus_io__$Pointer_Ref(tmp,tmp1);
		ref.deleter = function() {
			_g.remove(pos._x,pos._y);
		};
		return ref;
	}
	,pos: function(x,y) {
		return new tannus_ds_GridPos(x,y);
	}
	,posOf: function(value) {
		var _g1 = 0;
		var _g = this.data.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.data[i] == value) return this.pos(i % this.w,i / this.w | 0);
		}
		return null;
	}
	,valueAt: function(pos) {
		return this.get(pos._x,pos._y);
	}
	,remove: function(x,y) {
		var v = this.get(x,y);
		this.data[x + y * this.w] = null;
		return v != null;
	}
	,iterator: function() {
		return new tannus_ds__$Grid_GridValueIterator(this);
	}
	,positions: function() {
		return new tannus_ds__$Grid_GridPosIterator(this);
	}
	,index: function(x,y) {
		return x + y * this.w;
	}
	,position: function(index) {
		return new tannus_ds_GridPos(index % this.w,index / this.w | 0);
	}
	,get_length: function() {
		return this.data.length;
	}
	,__class__: tannus_ds_Grid
	,__properties__: {get_length:"get_length"}
};
var tannus_ds__$Grid_GridValueIterator = function(g) {
	this.grid = g;
	this.it = this.grid.positions();
};
$hxClasses["tannus.ds._Grid.GridValueIterator"] = tannus_ds__$Grid_GridValueIterator;
tannus_ds__$Grid_GridValueIterator.__name__ = ["tannus","ds","_Grid","GridValueIterator"];
tannus_ds__$Grid_GridValueIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var p = this.it.next();
		return this.grid.get(p._x,p._y);
	}
	,__class__: tannus_ds__$Grid_GridValueIterator
};
var tannus_ds__$Grid_GridPosIterator = function(g) {
	this.grid = g;
	this.it = new IntIterator(0,g.data.length);
};
$hxClasses["tannus.ds._Grid.GridPosIterator"] = tannus_ds__$Grid_GridPosIterator;
tannus_ds__$Grid_GridPosIterator.__name__ = ["tannus","ds","_Grid","GridPosIterator"];
tannus_ds__$Grid_GridPosIterator.prototype = {
	hasNext: function() {
		var tmp;
		var _this = this.it;
		tmp = _this.min < _this.max;
		return tmp;
	}
	,next: function() {
		var tmp;
		var _this = this.grid;
		var index = this.it.min++;
		tmp = new tannus_ds_GridPos(index % _this.w,index / _this.w | 0);
		return tmp;
	}
	,__class__: tannus_ds__$Grid_GridPosIterator
};
var tannus_ds_GridPos = function(x,y) {
	this._x = x;
	this._y = y;
};
$hxClasses["tannus.ds.GridPos"] = tannus_ds_GridPos;
tannus_ds_GridPos.__name__ = ["tannus","ds","GridPos"];
tannus_ds_GridPos.prototype = {
	left: function() {
		return new tannus_ds_GridPos(this._x - 1,this._y);
	}
	,right: function() {
		return new tannus_ds_GridPos(this._x + 1,this._y);
	}
	,top: function() {
		return new tannus_ds_GridPos(this._x,this._y - 1);
	}
	,bottom: function() {
		return new tannus_ds_GridPos(this._x,this._y + 1);
	}
	,toString: function() {
		return "(" + this._x + ", " + this._y + ")";
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: tannus_ds_GridPos
	,__properties__: {get_y:"get_y",get_x:"get_x"}
};
var tannus_ds_MapTools = function() { };
$hxClasses["tannus.ds.MapTools"] = tannus_ds_MapTools;
tannus_ds_MapTools.__name__ = ["tannus","ds","MapTools"];
tannus_ds_MapTools.keyArray = function(self) {
	var tmp;
	var _g = [];
	var $it0 = self.keys();
	while( $it0.hasNext() ) {
		var k = $it0.next();
		_g.push(k);
	}
	tmp = _g;
	return tmp;
};
tannus_ds_MapTools.pull = function(o,source) {
	var $it0 = source.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var v = source.get(key);
		o.set(key,v);
	}
};
tannus_ds_MapTools.toObject = function(self) {
	var o = { };
	var $it0 = self.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value = __map_reserved[key] != null?self.getReserved(key):self.h[key];
		var tmp1;
		if(o.__properties__ && (tmp1 = o.__properties__["set_" + key])) o[tmp1](value); else o[key] = value;
		var tmp;
		var tmp2;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + key])) tmp = o[tmp2](); else tmp = o[key];
		tmp;
	}
	return o;
};
var tannus_ds__$Maybe_Maybe_$Impl_$ = {};
$hxClasses["tannus.ds._Maybe.Maybe_Impl_"] = tannus_ds__$Maybe_Maybe_$Impl_$;
tannus_ds__$Maybe_Maybe_$Impl_$.__name__ = ["tannus","ds","_Maybe","Maybe_Impl_"];
tannus_ds__$Maybe_Maybe_$Impl_$.__properties__ = {get_value:"get_value",get_exists:"get_exists"}
tannus_ds__$Maybe_Maybe_$Impl_$._new = function(x) {
	return x;
};
tannus_ds__$Maybe_Maybe_$Impl_$.or = function(this1,alt) {
	return this1 != null?this1:alt;
};
tannus_ds__$Maybe_Maybe_$Impl_$.orGetter = function(this1,gettr) {
	return this1 != null?this1:gettr();
};
tannus_ds__$Maybe_Maybe_$Impl_$.runIf = function(this1,f) {
	return this1 != null?f(this1 != null?this1:this1):null;
};
tannus_ds__$Maybe_Maybe_$Impl_$.get_exists = function(this1) {
	return this1 != null;
};
tannus_ds__$Maybe_Maybe_$Impl_$.get_value = function(this1) {
	return this1 != null?this1:this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.orDie = function(this1,error) {
	if(!(this1 != null)) throw new js__$Boot_HaxeError(error);
	return this1 != null?this1:this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.toNonNullable = function(this1) {
	if(this1 != null) return this1; else return this1;
};
tannus_ds__$Maybe_Maybe_$Impl_$.toBoolean = function(this1) {
	return this1 != null;
};
var tannus_ds_Memory = function() { };
$hxClasses["tannus.ds.Memory"] = tannus_ds_Memory;
tannus_ds_Memory.__name__ = ["tannus","ds","Memory"];
tannus_ds_Memory.uniqueIdInt = function() {
	var id = tannus_ds_Memory.state;
	tannus_ds_Memory.state++;
	return id;
};
tannus_ds_Memory.uniqueIdString = function(prefix) {
	if(prefix == null) prefix = "";
	return prefix + tannus_ds_Memory.uniqueIdInt();
};
tannus_ds_Memory.allocRandomId = function(digits) {
	var id = "";
	var r = new tannus_math_Random();
	var _g = 0;
	while(_g < digits) {
		_g++;
		var range = [0,0];
		var letter = r.randbool();
		if(letter) {
			var upper = r.randbool();
			range = upper?[65,90]:[97,122];
		} else range = [48,57];
		var tmp;
		var n = r.randint(range[0],range[1]);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		tmp = this1;
		var c = tmp;
		id += String.fromCharCode(c);
	}
	if(Lambda.has(tannus_ds_Memory.used,id)) return tannus_ds_Memory.allocRandomId(digits); else {
		tannus_ds_Memory.used.push(id);
		return id;
	}
};
tannus_ds_Memory.freeRandomId = function(id) {
	return HxOverrides.remove(tannus_ds_Memory.used,id);
};
var tannus_ds__$Method_Method_$Impl_$ = {};
$hxClasses["tannus.ds._Method.Method_Impl_"] = tannus_ds__$Method_Method_$Impl_$;
tannus_ds__$Method_Method_$Impl_$.__name__ = ["tannus","ds","_Method","Method_Impl_"];
tannus_ds__$Method_Method_$Impl_$.__properties__ = {get_call:"get_call"}
tannus_ds__$Method_Method_$Impl_$._new = function(func,ctx) {
	var this1;
	var tmp;
	var o = ctx;
	var a1 = func;
	tmp = function(a2) {
		return Reflect.callMethod(o,a1,a2);
	};
	this1 = tmp;
	return this1;
};
tannus_ds__$Method_Method_$Impl_$.get_call = function(this1) {
	return Reflect.makeVarArgs(this1);
};
tannus_ds__$Method_Method_$Impl_$.fromFunction = function(f) {
	var tmp;
	var this1;
	var tmp1;
	var a1 = f;
	tmp1 = function(a2) {
		return Reflect.callMethod(null,a1,a2);
	};
	this1 = tmp1;
	tmp = this1;
	return tmp;
};
var tannus_ds__$Obj_Obj_$Impl_$ = {};
$hxClasses["tannus.ds._Obj.Obj_Impl_"] = tannus_ds__$Obj_Obj_$Impl_$;
tannus_ds__$Obj_Obj_$Impl_$.__name__ = ["tannus","ds","_Obj","Obj_Impl_"];
tannus_ds__$Obj_Obj_$Impl_$._new = function(o) {
	var this1;
	this1 = tannus_ds_CObj.create(o);
	return this1;
};
tannus_ds__$Obj_Obj_$Impl_$.toDyn = function(this1) {
	return this1.o;
};
tannus_ds__$Obj_Obj_$Impl_$.get = function(this1,key) {
	var tmp;
	var o = this1.o;
	var tmp1;
	if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + key])) tmp = o[tmp1](); else tmp = o[key];
	return tmp;
};
tannus_ds__$Obj_Obj_$Impl_$.mget = function(this1,key) {
	var tmp;
	var o = this1.o;
	var tmp1;
	if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + key])) tmp = o[tmp1](); else tmp = o[key];
	return tmp;
};
tannus_ds__$Obj_Obj_$Impl_$.set = function(this1,key,val) {
	return this1.set(key,val);
};
tannus_ds__$Obj_Obj_$Impl_$.fromDynamic = function(d) {
	return tannus_ds_CObj.create(d);
};
var tannus_ds_CObj = $hx_exports.tannus.ds.Obj = function(obj) {
	this.o = obj;
	this.refCache = new haxe_ds_StringMap();
};
$hxClasses["tannus.ds.CObj"] = tannus_ds_CObj;
tannus_ds_CObj.__name__ = ["tannus","ds","CObj"];
tannus_ds_CObj.create = function(o) {
	if(js_Boot.__instanceof(o,tannus_ds_CObj)) return o; else return new tannus_ds_CObj(o);
};
tannus_ds_CObj.prototype = {
	keys: function() {
		return Reflect.fields(this.o);
	}
	,exists: function(key) {
		return Object.prototype.hasOwnProperty.call(this.o,key);
	}
	,get: function(key) {
		return (function($this) {
			var $r;
			var o = $this.o;
			var tmp;
			$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + key])?o[tmp]():o[key];
			return $r;
		}(this));
	}
	,set: function(key,val) {
		var o = this.o;
		var tmp1;
		if(o.__properties__ && (tmp1 = o.__properties__["set_" + key])) o[tmp1](val); else o[key] = val;
		var tmp;
		var o1 = this.o;
		var tmp2;
		if(o1 == null) tmp = null; else if(o1.__properties__ && (tmp2 = o1.__properties__["get_" + key])) tmp = o1[tmp2](); else tmp = o1[key];
		return tmp;
	}
	,method: function(name) {
		return Reflect.makeVarArgs((function($this) {
			var $r;
			var f = (function($this) {
				var $r;
				var _e = $this.o;
				$r = function(func,args) {
					return func.apply(_e,args);
				};
				return $r;
			}($this));
			var a1 = (function($this) {
				var $r;
				var o = $this.o;
				var tmp;
				$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + name])?o[tmp]():o[name];
				return $r;
			}($this));
			$r = function(a2) {
				return f(a1,a2);
			};
			return $r;
		}(this)));
	}
	,call: function(name,args) {
		var tmp;
		var tmp1;
		var o = this.o;
		var tmp2;
		if(o == null) tmp1 = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + name])) tmp1 = o[tmp2](); else tmp1 = o[name];
		var func = tmp1;
		tmp = func.apply(this.o,args);
		return tmp;
	}
	,field: function(key) {
		var _g = this;
		if((function($this) {
			var $r;
			var _this = $this.refCache;
			$r = __map_reserved[key] != null?_this.existsReserved(key):_this.h.hasOwnProperty(key);
			return $r;
		}(this))) return (function($this) {
			var $r;
			var _this1 = $this.refCache;
			$r = __map_reserved[key] != null?_this1.getReserved(key):_this1.h[key];
			return $r;
		}(this)); else {
			var ref = new tannus_io__$Pointer_Ref((function($this) {
				var $r;
				var f = $bind($this,$this.get);
				var a1 = key;
				$r = function() {
					return f(a1);
				};
				return $r;
			}(this)),(function($this) {
				var $r;
				var f1 = $bind($this,$this.set);
				var a11 = key;
				$r = function(a2) {
					return f1(a11,a2);
				};
				return $r;
			}(this)));
			var _this2 = this.refCache;
			if(__map_reserved[key] != null) _this2.setReserved(key,ref); else _this2.h[key] = ref;
			return ref;
		}
	}
	,remove: function(key) {
		return Reflect.deleteField(this.o,key);
	}
	,pluck: function(keys) {
		var o = { };
		var copy = tannus_ds_CObj.create(o);
		var _g = 0;
		var _g1 = this.keys();
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			if(Lambda.has(keys,k)) {
				var tmp;
				var o1 = this.o;
				var tmp1;
				if(o1 == null) tmp = null; else if(o1.__properties__ && (tmp1 = o1.__properties__["get_" + k])) tmp = o1[tmp1](); else tmp = o1[k];
				var val = tmp;
				copy.set(k,val);
			}
		}
		return copy;
	}
	,rawclone: function() {
		var o = { };
		var copy = tannus_ds_CObj.create(o);
		var _g = 0;
		var _g1 = this.keys();
		while(_g < _g1.length) {
			var k = _g1[_g];
			++_g;
			var tmp;
			var o1 = this.o;
			var tmp1;
			if(o1 == null) tmp = null; else if(o1.__properties__ && (tmp1 = o1.__properties__["get_" + k])) tmp = o1[tmp1](); else tmp = o1[k];
			var val = tmp;
			copy.set(k,val);
		}
		return copy;
	}
	,clone: function() {
		var tmp;
		var o = this.o;
		if(o == null) tmp = null; else tmp = js_Boot.getClass(o);
		var klass = tmp;
		if(klass != null) {
			var copi = Type.createEmptyInstance(klass);
			var ocopy = tannus_ds_CObj.create(copi);
			var _g = 0;
			var _g1 = this.keys();
			while(_g < _g1.length) {
				var k = _g1[_g];
				++_g;
				var tmp1;
				var o1 = this.o;
				var tmp2;
				if(o1 == null) tmp1 = null; else if(o1.__properties__ && (tmp2 = o1.__properties__["get_" + k])) tmp1 = o1[tmp2](); else tmp1 = o1[k];
				var val = tmp1;
				ocopy.set(k,val);
			}
			return ocopy;
		} else return Reflect.copy(this.o);
	}
	,defineGetter: function(key,getter) {
		{
			var func = (function($this) {
				var $r;
				var o = $this.o;
				var tmp;
				$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + "__defineGetter__"])?o[tmp]():o.__defineGetter__;
				return $r;
			}(this));
			func.apply(this.o,[key,getter]);
		}
	}
	,defineSetter: function(key,setter) {
		{
			var func = (function($this) {
				var $r;
				var o = $this.o;
				var tmp;
				$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + "__defineSetter__"])?o[tmp]():o.__defineSetter__;
				return $r;
			}(this));
			func.apply(this.o,[key,setter]);
		}
	}
	,defineProperty: function(name,pointer) {
		var tmp;
		var tmp2;
		var o = this.o;
		var tmp3;
		if(o == null) tmp2 = null; else if(o.__properties__ && (tmp3 = o.__properties__["get_" + "__defineGetter__"])) tmp2 = o[tmp3](); else tmp2 = o.__defineGetter__;
		var func = tmp2;
		tmp = func.apply(this.o,[name,pointer.getter]);
		tmp;
		var tmp1;
		var tmp4;
		var o1 = this.o;
		var tmp5;
		if(o1 == null) tmp4 = null; else if(o1.__properties__ && (tmp5 = o1.__properties__["get_" + "__defineSetter__"])) tmp4 = o1[tmp5](); else tmp4 = o1.__defineSetter__;
		var func1 = tmp4;
		tmp1 = func1.apply(this.o,[name,pointer.setter]);
		tmp1;
	}
	,__class__: tannus_ds_CObj
};
var tannus_ds__$Object_Object_$Impl_$ = {};
$hxClasses["tannus.ds._Object.Object_Impl_"] = tannus_ds__$Object_Object_$Impl_$;
tannus_ds__$Object_Object_$Impl_$.__name__ = ["tannus","ds","_Object","Object_Impl_"];
tannus_ds__$Object_Object_$Impl_$.__properties__ = {get_keys:"get_keys"}
tannus_ds__$Object_Object_$Impl_$._new = function(o) {
	return o;
};
tannus_ds__$Object_Object_$Impl_$.get_keys = function(this1) {
	return Reflect.fields(this1);
};
tannus_ds__$Object_Object_$Impl_$.get = function(this1,key) {
	var tmp;
	var tmp1;
	if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp1 = this1.__properties__["get_" + key])) tmp = this1[tmp1](); else tmp = this1[key];
	return tmp;
};
tannus_ds__$Object_Object_$Impl_$.rawget = function(this1,key) {
	return (function($this) {
		var $r;
		var tmp;
		$r = this1 == null?null:this1.__properties__ && (tmp = this1.__properties__["get_" + key])?this1[tmp]():this1[key];
		return $r;
	}(this));
};
tannus_ds__$Object_Object_$Impl_$.set = function(this1,key,value) {
	var tmp1;
	if(this1.__properties__ && (tmp1 = this1.__properties__["set_" + key])) this1[tmp1](value); else this1[key] = value;
	var tmp;
	var tmp2;
	if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp2 = this1.__properties__["get_" + key])) tmp = this1[tmp2](); else tmp = this1[key];
	return tmp;
};
tannus_ds__$Object_Object_$Impl_$.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.remove = function(this1,key) {
	Reflect.deleteField(this1,key);
};
tannus_ds__$Object_Object_$Impl_$.clone = function(this1) {
	var c = { };
	var _g = 0;
	var _g1 = Reflect.fields(this1);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var tmp;
		var tmp2;
		if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp2 = this1.__properties__["get_" + k])) tmp = this1[tmp2](); else tmp = this1[k];
		var value = tmp;
		var tmp3;
		if(c.__properties__ && (tmp3 = c.__properties__["set_" + k])) c[tmp3](value); else c[k] = value;
		var tmp1;
		var tmp4;
		if(c == null) tmp1 = null; else if(c.__properties__ && (tmp4 = c.__properties__["get_" + k])) tmp1 = c[tmp4](); else tmp1 = c[k];
		tmp1;
	}
	return c;
};
tannus_ds__$Object_Object_$Impl_$.pairs = function(this1) {
	return Reflect.fields(this1).map(function(k) {
		var tmp;
		var tmp1;
		if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp1 = this1.__properties__["get_" + k])) tmp = this1[tmp1](); else tmp = this1[k];
		return { 'name' : k, 'value' : tmp};
	});
};
tannus_ds__$Object_Object_$Impl_$.iterator = function(this1) {
	var tmp;
	var tmp1;
	var this2 = this1;
	tmp1 = Reflect.fields(this2).map(function(k) {
		var tmp2;
		var tmp3;
		if(this2 == null) tmp2 = null; else if(this2.__properties__ && (tmp3 = this2.__properties__["get_" + k])) tmp2 = this2[tmp3](); else tmp2 = this2[k];
		return { 'name' : k, 'value' : tmp2};
	});
	var _this = tmp1;
	tmp = HxOverrides.iter(_this);
	return tmp;
};
tannus_ds__$Object_Object_$Impl_$.increment = function(this1,other) {
	var _g = 0;
	var _g1 = Reflect.fields(other);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		if(!Object.prototype.hasOwnProperty.call(this1,key)) {
			var tmp;
			var tmp2;
			if(other == null) tmp = null; else if(other.__properties__ && (tmp2 = other.__properties__["get_" + key])) tmp = other[tmp2](); else tmp = other[key];
			var value = tmp;
			var tmp3;
			if(this1.__properties__ && (tmp3 = this1.__properties__["set_" + key])) this1[tmp3](value); else this1[key] = value;
			var tmp1;
			var tmp4;
			if(this1 == null) tmp1 = null; else if(this1.__properties__ && (tmp4 = this1.__properties__["get_" + key])) tmp1 = this1[tmp4](); else tmp1 = this1[key];
			tmp1;
		}
	}
	return this1;
};
tannus_ds__$Object_Object_$Impl_$.plus = function(this1,other) {
	var res = tannus_ds__$Object_Object_$Impl_$.clone(this1);
	var _g = 0;
	var _g1 = Reflect.fields(other);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		if(!Object.prototype.hasOwnProperty.call(res,k)) {
			var tmp;
			var tmp2;
			if(other == null) tmp = null; else if(other.__properties__ && (tmp2 = other.__properties__["get_" + k])) tmp = other[tmp2](); else tmp = other[k];
			var value = tmp;
			var tmp3;
			if(res.__properties__ && (tmp3 = res.__properties__["set_" + k])) res[tmp3](value); else res[k] = value;
			var tmp1;
			var tmp4;
			if(res == null) tmp1 = null; else if(res.__properties__ && (tmp4 = res.__properties__["get_" + k])) tmp1 = res[tmp4](); else tmp1 = res[k];
			tmp1;
		}
	}
	return res;
};
tannus_ds__$Object_Object_$Impl_$.write = function(this1,o) {
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var k = _g1[_g];
		++_g;
		var tmp;
		var tmp2;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + k])) tmp = o[tmp2](); else tmp = o[k];
		var value = tmp;
		var tmp3;
		if(this1.__properties__ && (tmp3 = this1.__properties__["set_" + k])) this1[tmp3](value); else this1[k] = value;
		var tmp1;
		var tmp4;
		if(this1 == null) tmp1 = null; else if(this1.__properties__ && (tmp4 = this1.__properties__["get_" + k])) tmp1 = this1[tmp4](); else tmp1 = this1[k];
		tmp1;
	}
};
tannus_ds__$Object_Object_$Impl_$.method = function(this1,mname) {
	var tmp;
	var tmp1;
	var tmp3;
	var tmp4;
	if(this1 == null) tmp3 = null; else if(this1.__properties__ && (tmp4 = this1.__properties__["get_" + mname])) tmp3 = this1[tmp4](); else tmp3 = this1[mname];
	var this3 = tmp3;
	if(this3 != null) tmp1 = this3; else tmp1 = this3;
	var func = tmp1;
	var this2;
	var tmp2;
	var o = this1;
	var a1 = func;
	tmp2 = function(a2) {
		return Reflect.callMethod(o,a1,a2);
	};
	this2 = tmp2;
	tmp = this2;
	return tmp;
};
tannus_ds__$Object_Object_$Impl_$.plucka = function(this1,keys) {
	return tannus_ds__$Object_Object_$Impl_$._plk(this1,keys);
};
tannus_ds__$Object_Object_$Impl_$._plk = function(this1,keys,mtarget) {
	var target = mtarget != null?mtarget:{ };
	var _g = 0;
	while(_g < keys.length) {
		var k = keys[_g];
		++_g;
		var tmp;
		var tmp2;
		if(this1 == null) tmp = null; else if(this1.__properties__ && (tmp2 = this1.__properties__["get_" + k])) tmp = this1[tmp2](); else tmp = this1[k];
		var value = tmp;
		var tmp3;
		if(target.__properties__ && (tmp3 = target.__properties__["set_" + k])) target[tmp3](value); else target[k] = value;
		var tmp1;
		var tmp4;
		if(target == null) tmp1 = null; else if(target.__properties__ && (tmp4 = target.__properties__["get_" + k])) tmp1 = target[tmp4](); else tmp1 = target[k];
		tmp1;
	}
	return target;
};
tannus_ds__$Object_Object_$Impl_$["is"] = function(this1,oreg) {
	var sel = new tannus_nore_CSelector(oreg);
	return sel.test(this1);
};
tannus_ds__$Object_Object_$Impl_$.toMap = function(this1) {
	var m = new haxe_ds_StringMap();
	var tmp;
	var tmp1;
	var this2 = this1;
	tmp1 = Reflect.fields(this2).map(function(k) {
		var tmp2;
		var tmp3;
		if(this2 == null) tmp2 = null; else if(this2.__properties__ && (tmp3 = this2.__properties__["get_" + k])) tmp2 = this2[tmp3](); else tmp2 = this2[k];
		return { 'name' : k, 'value' : tmp2};
	});
	var _this = tmp1;
	tmp = HxOverrides.iter(_this);
	while( tmp.hasNext() ) {
		var p = tmp.next();
		var value = p.value;
		var key = p.name;
		var value1 = value;
		if(__map_reserved[key] != null) m.setReserved(key,value1); else m.h[key] = value1;
	}
	return m;
};
tannus_ds__$Object_Object_$Impl_$.fromMap = function(map) {
	var o = { };
	var $it0 = map.keys();
	while( $it0.hasNext() ) {
		var key = $it0.next();
		var value = __map_reserved[key] != null?map.getReserved(key):map.h[key];
		var tmp1;
		if(o.__properties__ && (tmp1 = o.__properties__["set_" + key])) o[tmp1](value); else o[key] = value;
		var tmp;
		var tmp2;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + key])) tmp = o[tmp2](); else tmp = o[key];
		tmp;
	}
	return o;
};
var tannus_ds__$Pair_Pair_$Impl_$ = {};
$hxClasses["tannus.ds._Pair.Pair_Impl_"] = tannus_ds__$Pair_Pair_$Impl_$;
tannus_ds__$Pair_Pair_$Impl_$.__name__ = ["tannus","ds","_Pair","Pair_Impl_"];
tannus_ds__$Pair_Pair_$Impl_$._new = function(l,r) {
	return new tannus_ds_CPair(l,r);
};
tannus_ds__$Pair_Pair_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_ds__$Pair_Pair_$Impl_$.swap = function(this1) {
	return new tannus_ds_CPair(this1.right,this1.left);
};
tannus_ds__$Pair_Pair_$Impl_$.eq = function(this1,other) {
	return this1.left == other.left && this1.right == other.right;
};
var tannus_ds_CPair = function(l,r) {
	this.left = l;
	this.right = r;
};
$hxClasses["tannus.ds.CPair"] = tannus_ds_CPair;
tannus_ds_CPair.__name__ = ["tannus","ds","CPair"];
tannus_ds_CPair.prototype = {
	equals: function(other) {
		return this.left == other.left && this.right == other.right;
	}
	,toString: function() {
		return "Pair(" + Std.string(this.left) + ", " + Std.string(this.right) + ")";
	}
	,swap: function() {
		return new tannus_ds_CPair(this.right,this.left);
	}
	,__class__: tannus_ds_CPair
};
var tannus_ds__$Stack_StackIterator = function(s) {
	this.stack = s;
};
$hxClasses["tannus.ds._Stack.StackIterator"] = tannus_ds__$Stack_StackIterator;
tannus_ds__$Stack_StackIterator.__name__ = ["tannus","ds","_Stack","StackIterator"];
tannus_ds__$Stack_StackIterator.prototype = {
	hasNext: function() {
		return !this.stack.get_empty();
	}
	,next: function() {
		return this.stack.pop();
	}
	,__class__: tannus_ds__$Stack_StackIterator
};
var tannus_ds_StringUtils = $hx_exports.StringTools = function() { };
$hxClasses["tannus.ds.StringUtils"] = tannus_ds_StringUtils;
tannus_ds_StringUtils.__name__ = ["tannus","ds","StringUtils"];
tannus_ds_StringUtils.byteAt = function(s,i) {
	if(i <= s.length - 1) {
		var tmp;
		var n = HxOverrides.cca(s,i);
		var this1;
		if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
		this1 = n;
		tmp = this1;
		return tmp;
	} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
};
tannus_ds_StringUtils.byteMap = function(s,f) {
	var res = "";
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp;
		var tmp1;
		if(i <= s.length - 1) {
			var n = HxOverrides.cca(s,i);
			var this2;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this2 = n;
			tmp1 = this2;
		} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
		var this1 = f(tmp1);
		tmp = String.fromCharCode(this1);
		res += tmp;
	}
	return res;
};
tannus_ds_StringUtils.toCamelCase = function(s,sep) {
	if(sep == null) sep = "-";
	var parts = s.split(sep);
	if(parts.length <= 1) return parts.join("");
	var result = "";
	result += parts.shift().toLowerCase();
	var _g = 0;
	while(_g < parts.length) {
		var x = parts[_g];
		++_g;
		result += tannus_ds_StringUtils.capitalize(x);
	}
	return result;
};
tannus_ds_StringUtils.toDashed = function(s) {
	return tannus_ds_StringUtils.camelWords(s).join("-");
};
tannus_ds_StringUtils.camelWords = function(s) {
	var words = [];
	var word = "";
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp;
		if(i <= s.length - 1) {
			var n = HxOverrides.cca(s,i);
			var this1;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this1 = n;
			tmp = this1;
		} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
		var c = tmp;
		if(c >= 65 && c <= 90) {
			words.push(word);
			word = String.fromCharCode(c).toLowerCase();
		} else word += String.fromCharCode(c);
	}
	if(!(word.length == 0)) words.push(word);
	return words;
};
tannus_ds_StringUtils.count = function(str,pattern) {
	{
		var _g = pattern;
		switch(_g[1]) {
		case 0:
			var sub = _g[2];
			var pos = 0;
			var n = 0;
			var step = sub.length;
			while(true) {
				pos = str.indexOf(sub,pos);
				if(pos >= 0) {
					++n;
					pos += step;
				} else break;
			}
			return n;
		case 1:
			var e = _g[2];
			return tannus_io__$RegEx_RegEx_$Impl_$.matches(e,str).length;
		}
	}
};
tannus_ds_StringUtils.strip = function(str,pat) {
	{
		var _g = pat;
		switch(_g[1]) {
		case 0:
			return StringTools.replace(str,_g[2],"");
		case 1:
			var res = str;
			var reg = _g[2];
			var bits = tannus_io__$RegEx_RegEx_$Impl_$.matches(reg,str);
			var _g1 = 0;
			while(_g1 < bits.length) {
				var bit = bits[_g1];
				++_g1;
				res = StringTools.replace(res,bit[0],"");
			}
			return res;
		}
	}
};
tannus_ds_StringUtils.remove = function(str,sub) {
	var i = str.indexOf(sub);
	if(i == -1) return str; else if(i == 0) return str.substring(i + sub.length); else return str.substring(0,i) + str.substring(i + 1);
};
tannus_ds_StringUtils.wrap = function(str,wrapper,end) {
	if(end == null) end = wrapper;
	return wrapper + str + end;
};
tannus_ds_StringUtils.capitalize = function(s,fancy) {
	if(fancy == null) fancy = false;
	if(!fancy) return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase(); else {
		var res = "";
		var lwan = false;
		var _g1 = 0;
		var _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp;
			if(i <= s.length - 1) {
				var n = HxOverrides.cca(s,i);
				var this1;
				if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
				this1 = n;
				tmp = this1;
			} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
			var c = tmp;
			var tmp1;
			if(!(c >= 48 && c <= 57)) {
				var tmp2;
				if(c >= 65) tmp2 = c <= 90; else tmp2 = false;
				if(!tmp2) {
					if(c >= 97) tmp1 = c <= 122; else tmp1 = false;
				} else tmp1 = true;
			} else tmp1 = true;
			if(tmp1) {
				if(c >= 65 && c <= 90 || c >= 97 && c <= 122) {
					var l = String.fromCharCode(c);
					res += lwan?l.toLowerCase():l.toUpperCase();
				} else res += String.fromCharCode(c);
				lwan = true;
			} else {
				res += String.fromCharCode(c);
				lwan = false;
			}
		}
		return res;
	}
};
tannus_ds_StringUtils.has = function(str,sub) {
	var i;
	try {
		i = str.indexOf(sub);
	} catch( err ) {
		if (err instanceof js__$Boot_HaxeError) err = err.val;
		i = -1;
	}
	return i != -1;
};
tannus_ds_StringUtils.slice = function(str,pos,len) {
	return len != null?HxOverrides.substr(str,pos,len):str.substring(pos);
};
tannus_ds_StringUtils.before = function(s,del) {
	if(del != "" && tannus_ds_StringUtils.has(s,del)) return s.substring(0,s.indexOf(del)); else return s;
};
tannus_ds_StringUtils.beforeLast = function(s,del) {
	if(del != "" && tannus_ds_StringUtils.has(s,del)) return s.substring(0,s.lastIndexOf(del)); else return s;
};
tannus_ds_StringUtils.after = function(s,del) {
	if(del != "" && tannus_ds_StringUtils.has(s,del)) return s.substring(s.indexOf(del) + del.length); else return s;
};
tannus_ds_StringUtils.afterLast = function(s,del) {
	if(del != "" && tannus_ds_StringUtils.has(s,del)) return s.substring(s.lastIndexOf(del) + del.length); else return "";
};
tannus_ds_StringUtils.separate = function(s,sep,last) {
	if(last == null) last = false;
	var tmp;
	var a = (last?tannus_ds_StringUtils.beforeLast:tannus_ds_StringUtils.before)(s,sep);
	var b = (last?tannus_ds_StringUtils.afterLast:tannus_ds_StringUtils.after)(s,sep);
	tmp = [a,b];
	return tmp;
};
tannus_ds_StringUtils.lastByte = function(s) {
	var tmp;
	var n = HxOverrides.cca(s,s.length - 1);
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	tmp = this1;
	return tmp;
};
tannus_ds_StringUtils.empty = function(s) {
	return s.length == 0;
};
tannus_ds_StringUtils.times = function(s,count) {
	if(count == 0) return ""; else {
		var res = s;
		var _g1 = 0;
		var _g = --count;
		while(_g1 < _g) {
			_g1++;
			res += s;
		}
		return res;
	}
};
tannus_ds_StringUtils.isNumeric = function(s) {
	var _g1 = 0;
	var _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var tmp;
		var tmp1;
		if(i <= s.length - 1) {
			var n = HxOverrides.cca(s,i);
			var this2;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this2 = n;
			tmp1 = this2;
		} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + i + " is not within range(0, " + (s.length - 1) + ")");
		var this1 = tmp1;
		if(this1 >= 48) tmp = this1 <= 57; else tmp = false;
		if(!tmp) return false;
	}
	return true;
};
var tannus_ds__$StringUtils_Sep_$Impl_$ = {};
$hxClasses["tannus.ds._StringUtils.Sep_Impl_"] = tannus_ds__$StringUtils_Sep_$Impl_$;
tannus_ds__$StringUtils_Sep_$Impl_$.__name__ = ["tannus","ds","_StringUtils","Sep_Impl_"];
tannus_ds__$StringUtils_Sep_$Impl_$.__properties__ = {get_after:"get_after",get_before:"get_before"}
tannus_ds__$StringUtils_Sep_$Impl_$._new = function(a,b) {
	return [a,b];
};
tannus_ds__$StringUtils_Sep_$Impl_$.get_before = function(this1) {
	return this1[0];
};
tannus_ds__$StringUtils_Sep_$Impl_$.get_after = function(this1) {
	return this1[1];
};
var tannus_ds__$TwoTuple_TwoTuple_$Impl_$ = {};
$hxClasses["tannus.ds._TwoTuple.TwoTuple_Impl_"] = tannus_ds__$TwoTuple_TwoTuple_$Impl_$;
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.__name__ = ["tannus","ds","_TwoTuple","TwoTuple_Impl_"];
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.__properties__ = {set_two:"set_two",get_two:"get_two",set_one:"set_one",get_one:"get_one"}
tannus_ds__$TwoTuple_TwoTuple_$Impl_$._new = function(a,b) {
	return [a,b];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.get_one = function(this1) {
	return this1[0];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.set_one = function(this1,v) {
	return this1[0] = v;
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.get_two = function(this1) {
	return this1[1];
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.set_two = function(this1,v) {
	return this1[1] = v;
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.toString = function(this1) {
	return "(" + Std.string(this1[0]) + ", " + Std.string(this1[1]) + ")";
};
tannus_ds__$TwoTuple_TwoTuple_$Impl_$.toArray = function(this1) {
	return this1;
};
var tannus_ds_dict_IDict = function() { };
$hxClasses["tannus.ds.dict.IDict"] = tannus_ds_dict_IDict;
tannus_ds_dict_IDict.__name__ = ["tannus","ds","dict","IDict"];
tannus_ds_dict_IDict.prototype = {
	__class__: tannus_ds_dict_IDict
};
var tannus_ds_dict_ComparableDict = function() {
	this._pairs = new List();
};
$hxClasses["tannus.ds.dict.ComparableDict"] = tannus_ds_dict_ComparableDict;
tannus_ds_dict_ComparableDict.__name__ = ["tannus","ds","dict","ComparableDict"];
tannus_ds_dict_ComparableDict.__interfaces__ = [tannus_ds_dict_IDict];
tannus_ds_dict_ComparableDict.prototype = {
	pair: function(key,value) {
		var _g_head = this._pairs.h;
		var _g_val = null;
		while(_g_head != null) {
			var tmp;
			_g_val = _g_head[0];
			_g_head = _g_head[1];
			tmp = _g_val;
			var p = tmp;
			if(p[0].equals(key)) return p;
		}
		if(value != null) {
			var pair = [key,value];
			this._pairs.add(pair);
			return pair;
		} else return null;
	}
	,get: function(key) {
		var p = this.pair(key);
		if(p != null) return p[1]; else return null;
	}
	,set: function(key,value) {
		var p = this.pair(key,value);
		return p[1] = value;
	}
	,reference: function(key) {
		var tmp;
		var f = $bind(this,this.get);
		var a1 = key;
		tmp = function() {
			return f(a1);
		};
		var tmp1;
		var f1 = $bind(this,this.set);
		var a11 = key;
		tmp1 = function(a2) {
			return f1(a11,a2);
		};
		return new tannus_io__$Pointer_Ref(tmp,tmp1);
	}
	,exists: function(key) {
		return this.pair(key) != null;
	}
	,remove: function(key) {
		var p = this.pair(key);
		if(p != null) return this._pairs.remove(p); else return false;
	}
	,iterator: function() {
		return new tannus_ds_dict_ComparableDictIterator(this);
	}
	,keys: function() {
		return new tannus_ds_dict_ComparableDictKeyIterator(this);
	}
	,pairs: function() {
		return new _$List_ListIterator(this._pairs.h);
	}
	,hxSerialize: function(s) {
		var tmp;
		var f = $bind(s,s.serialize);
		tmp = function(v) {
			f(v);
		};
		var w = tmp;
		var tmp1;
		var _g = [];
		var $it0 = this.pairs();
		while( $it0.hasNext() ) {
			var pair = $it0.next();
			_g.push(pair);
		}
		tmp1 = _g;
		var pl = tmp1;
		w(pl.length);
		var _g1 = 0;
		while(_g1 < pl.length) {
			var p = pl[_g1];
			++_g1;
			w(p[0]);
			w(p[1]);
		}
	}
	,hxUnserialize: function(u) {
		this._pairs = new List();
		var count = u.unserialize();
		var _g = 0;
		while(_g < count) {
			_g++;
			this.set(u.unserialize(),u.unserialize());
		}
	}
	,__class__: tannus_ds_dict_ComparableDict
};
var tannus_ds_dict_ComparableDictIterator = function(cd) {
	this.it = new _$List_ListIterator(cd._pairs.h);
};
$hxClasses["tannus.ds.dict.ComparableDictIterator"] = tannus_ds_dict_ComparableDictIterator;
tannus_ds_dict_ComparableDictIterator.__name__ = ["tannus","ds","dict","ComparableDictIterator"];
tannus_ds_dict_ComparableDictIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var tmp;
		var this1 = this.it.next();
		tmp = this1[1];
		return tmp;
	}
	,__class__: tannus_ds_dict_ComparableDictIterator
};
var tannus_ds_dict_ComparableDictKeyIterator = function(cd) {
	this.it = new _$List_ListIterator(cd._pairs.h);
};
$hxClasses["tannus.ds.dict.ComparableDictKeyIterator"] = tannus_ds_dict_ComparableDictKeyIterator;
tannus_ds_dict_ComparableDictKeyIterator.__name__ = ["tannus","ds","dict","ComparableDictKeyIterator"];
tannus_ds_dict_ComparableDictKeyIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var tmp;
		var this1 = this.it.next();
		tmp = this1[0];
		return tmp;
	}
	,__class__: tannus_ds_dict_ComparableDictKeyIterator
};
var tannus_ds_dict_EnumValueDict = function() {
	this.m = new haxe_ds_EnumValueMap();
};
$hxClasses["tannus.ds.dict.EnumValueDict"] = tannus_ds_dict_EnumValueDict;
tannus_ds_dict_EnumValueDict.__name__ = ["tannus","ds","dict","EnumValueDict"];
tannus_ds_dict_EnumValueDict.__interfaces__ = [tannus_ds_dict_IDict];
tannus_ds_dict_EnumValueDict.prototype = {
	get: function(key) {
		return this.m.get(key);
	}
	,set: function(k,v) {
		this.m.set(k,v);
		return this.m.get(k);
	}
	,reference: function(key) {
		var tmp;
		var f = ($_=this.m,$bind($_,$_.get));
		var a1 = key;
		tmp = function() {
			return f(a1);
		};
		var tmp1;
		var f1 = $bind(this,this.set);
		var k = key;
		tmp1 = function(v) {
			return f1(k,v);
		};
		return new tannus_io__$Pointer_Ref(tmp,tmp1);
	}
	,exists: function(k) {
		return this.m.exists(k);
	}
	,remove: function(k) {
		return this.m.remove(k);
	}
	,iterator: function() {
		return this.m.iterator();
	}
	,keys: function() {
		return this.m.keys();
	}
	,pairs: function() {
		return new tannus_ds_dict_EVDPairIterator(this);
	}
	,hxSerialize: function(s) {
		var tmp;
		var f = $bind(s,s.serialize);
		tmp = function(v) {
			f(v);
		};
		var w = tmp;
		var tmp1;
		var _g = [];
		var $it0 = new tannus_ds_dict_EVDPairIterator(this);
		while( $it0.hasNext() ) {
			var pair = $it0.next();
			_g.push(pair);
		}
		tmp1 = _g;
		var pl = tmp1;
		w(pl.length);
		var _g1 = 0;
		while(_g1 < pl.length) {
			var p = pl[_g1];
			++_g1;
			w(p[0]);
			w(p[1]);
		}
	}
	,hxUnserialize: function(u) {
		var count = u.unserialize();
		this.m = new haxe_ds_EnumValueMap();
		var _g = 0;
		while(_g < count) {
			_g++;
			this.set(u.unserialize(),u.unserialize());
		}
	}
	,__class__: tannus_ds_dict_EnumValueDict
};
var tannus_ds_dict_EVDPairIterator = function(d) {
	this.dict = d;
	this.it = this.dict.m.keys();
};
$hxClasses["tannus.ds.dict.EVDPairIterator"] = tannus_ds_dict_EVDPairIterator;
tannus_ds_dict_EVDPairIterator.__name__ = ["tannus","ds","dict","EVDPairIterator"];
tannus_ds_dict_EVDPairIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var k = this.it.next();
		var tmp;
		var value = this.dict.m.get(k);
		tmp = [k,value];
		return tmp;
	}
	,__class__: tannus_ds_dict_EVDPairIterator
};
var tannus_ds_dict_IntDict = function() {
	this.m = new haxe_ds_IntMap();
};
$hxClasses["tannus.ds.dict.IntDict"] = tannus_ds_dict_IntDict;
tannus_ds_dict_IntDict.__name__ = ["tannus","ds","dict","IntDict"];
tannus_ds_dict_IntDict.__interfaces__ = [tannus_ds_dict_IDict];
tannus_ds_dict_IntDict.prototype = {
	get: function(key) {
		return this.m.h[key];
	}
	,set: function(k,v) {
		this.m.h[k] = v;
		return this.m.h[k];
	}
	,reference: function(key) {
		var tmp;
		var f = ($_=this.m,$bind($_,$_.get));
		var a1 = key;
		tmp = function() {
			return f(a1);
		};
		var tmp1;
		var f1 = $bind(this,this.set);
		var k = key;
		tmp1 = function(v) {
			return f1(k,v);
		};
		return new tannus_io__$Pointer_Ref(tmp,tmp1);
	}
	,exists: function(k) {
		return this.m.h.hasOwnProperty(k);
	}
	,remove: function(k) {
		return this.m.remove(k);
	}
	,iterator: function() {
		return this.m.iterator();
	}
	,keys: function() {
		return this.m.keys();
	}
	,pairs: function() {
		return new tannus_ds_dict_IntDictPairIterator(this);
	}
	,hxSerialize: function(s) {
		var tmp;
		var f = $bind(s,s.serialize);
		tmp = function(v) {
			f(v);
		};
		var w = tmp;
		var tmp1;
		var _g = [];
		var $it0 = new tannus_ds_dict_IntDictPairIterator(this);
		while( $it0.hasNext() ) {
			var pair = $it0.next();
			_g.push(pair);
		}
		tmp1 = _g;
		var pl = tmp1;
		w(pl.length);
		var _g1 = 0;
		while(_g1 < pl.length) {
			var p = pl[_g1];
			++_g1;
			w(p[0]);
			w(p[1]);
		}
	}
	,hxUnserialize: function(u) {
		var count = u.unserialize();
		this.m = new haxe_ds_IntMap();
		var _g = 0;
		while(_g < count) {
			_g++;
			this.set(u.unserialize(),u.unserialize());
		}
	}
	,__class__: tannus_ds_dict_IntDict
};
var tannus_ds_dict_IntDictPairIterator = function(d) {
	this.dict = d;
	this.it = this.dict.m.keys();
};
$hxClasses["tannus.ds.dict.IntDictPairIterator"] = tannus_ds_dict_IntDictPairIterator;
tannus_ds_dict_IntDictPairIterator.__name__ = ["tannus","ds","dict","IntDictPairIterator"];
tannus_ds_dict_IntDictPairIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var k = this.it.next();
		return [k,this.dict.m.h[k]];
	}
	,__class__: tannus_ds_dict_IntDictPairIterator
};
var tannus_ds_dict__$Pair_Pair_$Impl_$ = {};
$hxClasses["tannus.ds.dict._Pair.Pair_Impl_"] = tannus_ds_dict__$Pair_Pair_$Impl_$;
tannus_ds_dict__$Pair_Pair_$Impl_$.__name__ = ["tannus","ds","dict","_Pair","Pair_Impl_"];
tannus_ds_dict__$Pair_Pair_$Impl_$.__properties__ = {set_value:"set_value",get_value:"get_value",get_key:"get_key"}
tannus_ds_dict__$Pair_Pair_$Impl_$._new = function(key,value) {
	return [key,value];
};
tannus_ds_dict__$Pair_Pair_$Impl_$.get_key = function(this1) {
	return this1[0];
};
tannus_ds_dict__$Pair_Pair_$Impl_$.get_value = function(this1) {
	return this1[1];
};
tannus_ds_dict__$Pair_Pair_$Impl_$.set_value = function(this1,v) {
	return this1[1] = v;
};
var tannus_ds_dict_StringDict = function() {
	this.m = new haxe_ds_StringMap();
};
$hxClasses["tannus.ds.dict.StringDict"] = tannus_ds_dict_StringDict;
tannus_ds_dict_StringDict.__name__ = ["tannus","ds","dict","StringDict"];
tannus_ds_dict_StringDict.__interfaces__ = [tannus_ds_dict_IDict];
tannus_ds_dict_StringDict.prototype = {
	get: function(key) {
		var tmp;
		var _this = this.m;
		if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
		return tmp;
	}
	,set: function(k,v) {
		var _this = this.m;
		if(__map_reserved[k] != null) _this.setReserved(k,v); else _this.h[k] = v;
		var tmp;
		var _this1 = this.m;
		if(__map_reserved[k] != null) tmp = _this1.getReserved(k); else tmp = _this1.h[k];
		return tmp;
	}
	,reference: function(key) {
		var tmp;
		var f = ($_=this.m,$bind($_,$_.get));
		var a1 = key;
		tmp = function() {
			return f(a1);
		};
		var tmp1;
		var f1 = $bind(this,this.set);
		var k = key;
		tmp1 = function(v) {
			return f1(k,v);
		};
		return new tannus_io__$Pointer_Ref(tmp,tmp1);
	}
	,exists: function(k) {
		var tmp;
		var _this = this.m;
		if(__map_reserved[k] != null) tmp = _this.existsReserved(k); else tmp = _this.h.hasOwnProperty(k);
		return tmp;
	}
	,remove: function(k) {
		return this.m.remove(k);
	}
	,iterator: function() {
		var tmp;
		var _this = this.m;
		tmp = new haxe_ds__$StringMap_StringMapIterator(_this,_this.arrayKeys());
		return tmp;
	}
	,keys: function() {
		return this.m.keys();
	}
	,pairs: function() {
		return new tannus_ds_dict_StringDictPairIterator(this);
	}
	,hxSerialize: function(s) {
		var tmp;
		var f = $bind(s,s.serialize);
		tmp = function(v) {
			f(v);
		};
		var w = tmp;
		var tmp1;
		var _g = [];
		var $it0 = new tannus_ds_dict_StringDictPairIterator(this);
		while( $it0.hasNext() ) {
			var pair = $it0.next();
			_g.push(pair);
		}
		tmp1 = _g;
		var pl = tmp1;
		w(pl.length);
		var _g1 = 0;
		while(_g1 < pl.length) {
			var p = pl[_g1];
			++_g1;
			w(p[0]);
			w(p[1]);
		}
	}
	,hxUnserialize: function(u) {
		var count = u.unserialize();
		this.m = new haxe_ds_StringMap();
		var _g = 0;
		while(_g < count) {
			_g++;
			this.set(u.unserialize(),u.unserialize());
		}
	}
	,__class__: tannus_ds_dict_StringDict
};
var tannus_ds_dict_StringDictPairIterator = function(d) {
	this.dict = d;
	this.it = this.dict.m.keys();
};
$hxClasses["tannus.ds.dict.StringDictPairIterator"] = tannus_ds_dict_StringDictPairIterator;
tannus_ds_dict_StringDictPairIterator.__name__ = ["tannus","ds","dict","StringDictPairIterator"];
tannus_ds_dict_StringDictPairIterator.prototype = {
	hasNext: function() {
		return this.it.hasNext();
	}
	,next: function() {
		var k = this.it.next();
		var tmp;
		var tmp1;
		var _this = this.dict.m;
		if(__map_reserved[k] != null) tmp1 = _this.getReserved(k); else tmp1 = _this.h[k];
		var value = tmp1;
		tmp = [k,value];
		return tmp;
	}
	,__class__: tannus_ds_dict_StringDictPairIterator
};
var tannus_ds_tuples__$Tup2_Tup2_$Impl_$ = {};
$hxClasses["tannus.ds.tuples._Tup2.Tup2_Impl_"] = tannus_ds_tuples__$Tup2_Tup2_$Impl_$;
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.__name__ = ["tannus","ds","tuples","_Tup2","Tup2_Impl_"];
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.__properties__ = {set__1:"set__1",get__1:"get__1",set__0:"set__0",get__0:"get__0"}
tannus_ds_tuples__$Tup2_Tup2_$Impl_$._new = function(a,b) {
	return [a,b];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.get__0 = function(this1) {
	return this1[0];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.set__0 = function(this1,v) {
	return this1[0] = v;
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.get__1 = function(this1) {
	return this1[1];
};
tannus_ds_tuples__$Tup2_Tup2_$Impl_$.set__1 = function(this1,v) {
	return this1[1] = v;
};
var tannus_geom__$Angle_Angle_$Impl_$ = {};
$hxClasses["tannus.geom._Angle.Angle_Impl_"] = tannus_geom__$Angle_Angle_$Impl_$;
tannus_geom__$Angle_Angle_$Impl_$.__name__ = ["tannus","geom","_Angle","Angle_Impl_"];
tannus_geom__$Angle_Angle_$Impl_$._new = function(v) {
	return new tannus_geom_CAngle(v);
};
tannus_geom__$Angle_Angle_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_geom__$Angle_Angle_$Impl_$.toFloat = function(this1) {
	return this1.toFloat();
};
tannus_geom__$Angle_Angle_$Impl_$.plusAngle = function(this1,o) {
	return new tannus_geom_CAngle(this1.v + o.v);
};
tannus_geom__$Angle_Angle_$Impl_$.plusFloat = function(this1,o) {
	return new tannus_geom_CAngle(this1.v + o);
};
tannus_geom__$Angle_Angle_$Impl_$.fromFloat = function(v) {
	return new tannus_geom_CAngle(v);
};
var tannus_geom_CAngle = function(_v) {
	this.v = _v;
};
$hxClasses["tannus.geom.CAngle"] = tannus_geom_CAngle;
tannus_geom_CAngle.__name__ = ["tannus","geom","CAngle"];
tannus_geom_CAngle.prototype = {
	compliment: function() {
		return new tannus_geom_CAngle(360 - this.v);
	}
	,invert: function() {
		return new tannus_geom_CAngle(-this.v);
	}
	,toString: function() {
		return this.v + "°";
	}
	,toFloat: function() {
		return this.v;
	}
	,get_degrees: function() {
		return this.v;
	}
	,set_degrees: function(_v) {
		return this.v = _v;
	}
	,get_radians: function() {
		return this.v * Math.PI / 180;
	}
	,set_radians: function(_v) {
		this.v = _v * (Math.PI / 180);
		return this.v * Math.PI / 180;
	}
	,get_x: function() {
		return Math.cos(this.v * Math.PI / 180);
	}
	,get_y: function() {
		return Math.sin(this.v * Math.PI / 180);
	}
	,__class__: tannus_geom_CAngle
	,__properties__: {get_y:"get_y",get_x:"get_x",set_radians:"set_radians",get_radians:"get_radians",set_degrees:"set_degrees",get_degrees:"get_degrees"}
};
var tannus_geom__$Area_Area_$Impl_$ = {};
$hxClasses["tannus.geom._Area.Area_Impl_"] = tannus_geom__$Area_Area_$Impl_$;
tannus_geom__$Area_Area_$Impl_$.__name__ = ["tannus","geom","_Area","Area_Impl_"];
tannus_geom__$Area_Area_$Impl_$.__properties__ = {set_height:"set_height",get_height:"get_height",set_width:"set_width",get_width:"get_width"}
tannus_geom__$Area_Area_$Impl_$._new = function(w,h) {
	if(h == null) h = 0;
	if(w == null) w = 0;
	return [w,h];
};
tannus_geom__$Area_Area_$Impl_$.get_width = function(this1) {
	return this1[0];
};
tannus_geom__$Area_Area_$Impl_$.set_width = function(this1,nw) {
	return this1[0] = nw;
};
tannus_geom__$Area_Area_$Impl_$.get_height = function(this1) {
	return this1[1];
};
tannus_geom__$Area_Area_$Impl_$.set_height = function(this1,nh) {
	return this1[1] = nh;
};
tannus_geom__$Area_Area_$Impl_$.clone = function(this1) {
	return [this1[0],this1[1]];
};
tannus_geom__$Area_Area_$Impl_$.resize = function(this1,nw,nh,mr) {
	if(mr == null) mr = false;
	if(mr) {
		var w = this1[0];
		var h = this1[1];
		if(nw != null) {
			var rat = h / w;
			w = nw;
			h = w * rat;
			return [w,h];
		} else if(nh != null) {
			var rat1 = w / h;
			h = nh;
			w = h * rat1;
			return [w,h];
		} else throw new js__$Boot_HaxeError("GeometryError: Cannot maintain ration if both [width] and [height] are assigned!");
	} else {
		var w1 = nw != null?nw:this1[0];
		var h1 = nh != null?nh:this1[1];
		return [w1,h1];
	}
};
tannus_geom__$Area_Area_$Impl_$.toFloatTuple = function(this1) {
	return this1;
};
tannus_geom__$Area_Area_$Impl_$.toIntTuple = function(this1) {
	var tmp;
	var a = Math.round(this1[0]);
	var b = Math.round(this1[1]);
	tmp = [a,b];
	return tmp;
};
tannus_geom__$Area_Area_$Impl_$.fromTwoTuple = function(t) {
	return [t[0],t[1]];
};
tannus_geom__$Area_Area_$Impl_$.toRectangle = function(this1) {
	return new tannus_geom_CRectangle(0,0,this1[0],this1[1]);
};
tannus_geom__$Area_Area_$Impl_$.fromRectangle = function(r) {
	return [r.width,r.height];
};
tannus_geom__$Area_Area_$Impl_$.toString = function(this1) {
	return "Area<" + this1[0] + "x" + this1[1] + ">";
};
tannus_geom__$Area_Area_$Impl_$.fromString = function(s) {
	s = StringTools.replace(StringTools.replace(StringTools.replace(s,"Area",""),"<",""),">","");
	var tmp;
	var a = s.split("x").map(function(x) {
		return Std.parseFloat(x);
	});
	tmp = [a[0],a[1]];
	return tmp;
};
tannus_geom__$Area_Area_$Impl_$.toFloatArray = function(this1) {
	return [this1[0],this1[1]];
};
tannus_geom__$Area_Area_$Impl_$.toIntArray = function(this1) {
	return [this1[0],this1[1]].map(Math.round);
};
tannus_geom__$Area_Area_$Impl_$.fromFloatArray = function(a) {
	return [a[0],a[1]];
};
tannus_geom__$Area_Area_$Impl_$.fromIntArray = function(a) {
	return [a[0],a[1]];
};
tannus_geom__$Area_Area_$Impl_$.i = function(f) {
	return Math.round(f);
};
var tannus_geom_OldArea = function(w,h) {
	if(h == null) h = 0;
	if(w == null) w = 0;
	this.width = w;
	this.height = h;
};
$hxClasses["tannus.geom.OldArea"] = tannus_geom_OldArea;
tannus_geom_OldArea.__name__ = ["tannus","geom","OldArea"];
tannus_geom_OldArea.prototype = {
	__class__: tannus_geom_OldArea
};
var tannus_geom_Line = function(o,t) {
	this.one = o;
	this.two = t;
};
$hxClasses["tannus.geom.Line"] = tannus_geom_Line;
tannus_geom_Line.__name__ = ["tannus","geom","Line"];
tannus_geom_Line.prototype = {
	intersects: function(other) {
		var sl = new tannus_geom_Line(this.two.minusPoint(this.one),other.two.minusPoint(other.one));
		var s = (-sl.one.get_y() * (this.one.get_x() - other.one.get_x()) + sl.one.get_x() * (this.one.get_y() - other.one.get_y())) / (-sl.two.get_x() * sl.one.get_y() + sl.one.get_x() * sl.two.get_y());
		var t = (sl.two.get_x() * (this.one.get_y() - other.one.get_y()) - sl.two.get_y() * (this.one.get_x() - other.one.get_x())) / (-sl.two.get_x() * sl.one.get_y() + sl.one.get_x() * sl.two.get_y());
		return s >= 0 && s <= 1 && (t >= 0 && t <= 1);
	}
	,toString: function() {
		return "Line<(" + this.one.get_x() + ", " + this.one.get_y() + ") => (" + this.two.get_x() + ", " + this.two.get_y() + ")>";
	}
	,getPoint: function(d) {
		var tmp;
		var angle = this.one.angleTo(this.two);
		tmp = new tannus_geom_CVelocity(d,angle);
		var vel = tmp;
		var res = vel.get_vector();
		res.moveByPoint(this.one);
		res.clamp();
		return res;
	}
	,along: function(d) {
		return this.one.lerp(this.two,d);
	}
	,getVertices: function() {
		var pts = [];
		this.one.clamp();
		this.two.clamp();
		var _g1 = 0;
		var _g = Math.round(this.one.distanceFrom(this.two));
		while(_g1 < _g) {
			var i = _g1++;
			pts.push(this.getPoint(i));
		}
		return new tannus_geom_VertexArray(pts);
	}
	,get_slope: function() {
		return (this.one.get_y() - this.two.get_y()) / (this.one.get_x() - this.two.get_x());
	}
	,get_slopeRatio: function() {
		var tmp;
		var top = this.one.get_y() - this.two.get_y();
		var bottom = this.one.get_x() - this.two.get_x();
		tmp = new tannus_math_CRatio(top,bottom);
		return tmp;
	}
	,get_length: function() {
		return this.one.distanceFrom(this.two);
	}
	,get_start: function() {
		return this.one;
	}
	,set_start: function(ns) {
		return this.one = ns;
	}
	,get_end: function() {
		return this.two;
	}
	,set_end: function(ne) {
		return this.two = ne;
	}
	,get_mid: function() {
		return this.one.lerp(this.two,0.5);
	}
	,get_angle: function() {
		return this.one.angleTo(this.two);
	}
	,get_rectangle: function() {
		var min = this.one.distanceFrom(new tannus_geom_TPoint(0,0,0)) > this.two.distanceFrom(new tannus_geom_TPoint(0,0,0))?this.two:this.one;
		var max = this.one.distanceFrom(new tannus_geom_TPoint(0,0,0)) > this.two.distanceFrom(new tannus_geom_TPoint(0,0,0))?this.one:this.two;
		var tmp;
		var _x = min.get_x();
		var _y = min.get_y();
		var _width = max.get_x() - min.get_x();
		var _height = max.get_y() - min.get_y();
		tmp = new tannus_geom_CRectangle(_x,_y,_width,_height);
		return tmp;
	}
	,get_sx: function() {
		return this.one.get_x();
	}
	,set_sx: function(v) {
		return this.one.set_x(v);
	}
	,get_sy: function() {
		return this.one.get_y();
	}
	,set_sy: function(v) {
		return this.one.set_y(v);
	}
	,get_ex: function() {
		return this.two.get_x();
	}
	,set_ex: function(v) {
		return this.two.set_x(v);
	}
	,get_ey: function() {
		return this.two.get_y();
	}
	,set_ey: function(v) {
		return this.two.set_y(v);
	}
	,__class__: tannus_geom_Line
	,__properties__: {set_ey:"set_ey",get_ey:"get_ey",set_ex:"set_ex",get_ex:"get_ex",set_sy:"set_sy",get_sy:"get_sy",set_sx:"set_sx",get_sx:"get_sx",get_rectangle:"get_rectangle",get_angle:"get_angle",get_mid:"get_mid",set_end:"set_end",get_end:"get_end",set_start:"set_start",get_start:"get_start",get_length:"get_length",get_slopeRatio:"get_slopeRatio",get_slope:"get_slope"}
};
var tannus_geom_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) ty = 0;
	if(tx == null) tx = 0;
	if(d == null) d = 1;
	if(c == null) c = 0;
	if(b == null) b = 0;
	if(a == null) a = 1;
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
$hxClasses["tannus.geom.Matrix"] = tannus_geom_Matrix;
tannus_geom_Matrix.__name__ = ["tannus","geom","Matrix"];
tannus_geom_Matrix.prototype = {
	clone: function() {
		return new tannus_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = scaleX;
		this.d = scaleY;
		this.b = rotation;
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) ty = 0;
		if(tx == null) tx = 0;
		if(rotation == null) rotation = 0;
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,equals: function(matrix) {
		return matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c && this.d == matrix.d;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,mult: function(m) {
		var result = new tannus_geom_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		result.concat(m);
		return result;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) scale = 1;
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,toString: function() {
		return "Matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(pos,newpos) {
		if(newpos == null) newpos = new tannus_geom_TPoint(0,0,0);
		var x = pos.get_x();
		var y = pos.get_y();
		newpos.set_x(this.a * x + this.c * y + this.tx);
		newpos.set_y(this.b * x + this.d * y + this.ty);
		return newpos;
	}
	,translate: function(dx,dy) {
		var m = new tannus_geom_Matrix();
		m.tx = dx;
		m.ty = dy;
		this.concat(m);
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__class__: tannus_geom_Matrix
};
var tannus_geom__$Point_Point_$Impl_$ = {};
$hxClasses["tannus.geom._Point.Point_Impl_"] = tannus_geom__$Point_Point_$Impl_$;
tannus_geom__$Point_Point_$Impl_$.__name__ = ["tannus","geom","_Point","Point_Impl_"];
tannus_geom__$Point_Point_$Impl_$.__properties__ = {get_d:"get_d",set_iz:"set_iz",get_iz:"get_iz",set_iy:"set_iy",get_iy:"get_iy",set_ix:"set_ix",get_ix:"get_ix",set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
tannus_geom__$Point_Point_$Impl_$._new = function(x,y,z) {
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	return new tannus_geom_TPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.get_x = function(this1) {
	return this1.get_x();
};
tannus_geom__$Point_Point_$Impl_$.set_x = function(this1,nx) {
	return this1.set_x(nx);
};
tannus_geom__$Point_Point_$Impl_$.get_y = function(this1) {
	return this1.get_y();
};
tannus_geom__$Point_Point_$Impl_$.set_y = function(this1,ny) {
	return this1.set_y(ny);
};
tannus_geom__$Point_Point_$Impl_$.get_z = function(this1) {
	return this1.get_z();
};
tannus_geom__$Point_Point_$Impl_$.set_z = function(this1,nz) {
	return this1.set_z(nz);
};
tannus_geom__$Point_Point_$Impl_$.get_ix = function(this1) {
	var tmp;
	var f = this1.get_x();
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.set_ix = function(this1,nix) {
	var tmp;
	var f = this1.set_x(nix);
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.get_iy = function(this1) {
	var tmp;
	var f = this1.get_y();
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.set_iy = function(this1,niy) {
	var tmp;
	var f = this1.set_y(niy);
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.get_iz = function(this1) {
	var tmp;
	var f = this1.get_z();
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.set_iz = function(this1,niz) {
	var tmp;
	var f = this1.set_z(niz);
	tmp = f | 0;
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.get_d = function(this1) {
	return this1.distanceFrom(new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.transform = function(this1,m) {
	return m.transformPoint(this1.clone());
};
tannus_geom__$Point_Point_$Impl_$.moveByPoint = function(this1,p) {
	return this1.moveByPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.moveByFloat = function(this1,n) {
	return this1.moveByFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.moveByInt = function(this1,n) {
	return this1.moveByFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.plusPoint = function(this1,other) {
	return this1.plusPoint(other);
};
tannus_geom__$Point_Point_$Impl_$.plusFloat = function(this1,n) {
	return this1.plusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.plusInt = function(this1,n) {
	return this1.plusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.iminusPoint = function(this1,p) {
	return this1.iminusPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.iminusFloat = function(this1,n) {
	return this1.iminusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.minusPoint = function(this1,p) {
	return this1.minusPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.minusFloat = function(this1,n) {
	return this1.minusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.minusInt = function(this1,n) {
	return this1.minusFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.dividePoint = function(this1,p) {
	return this1.dividePoint(p);
};
tannus_geom__$Point_Point_$Impl_$.divideFloat = function(this1,d) {
	return this1.divideFloat(d);
};
tannus_geom__$Point_Point_$Impl_$.multPoint = function(this1,p) {
	return this1.multPoint(p);
};
tannus_geom__$Point_Point_$Impl_$.multFloat = function(this1,n) {
	return this1.multFloat(n);
};
tannus_geom__$Point_Point_$Impl_$.negate = function(this1) {
	return this1.negate();
};
tannus_geom__$Point_Point_$Impl_$.greaterThan = function(this1,other) {
	return this1.distanceFrom(new tannus_geom_TPoint(0,0,0)) > other.distanceFrom(new tannus_geom_TPoint(0,0,0));
};
tannus_geom__$Point_Point_$Impl_$.lessThan = function(this1,other) {
	return !(this1.distanceFrom(new tannus_geom_TPoint(0,0,0)) > other.distanceFrom(new tannus_geom_TPoint(0,0,0)));
};
tannus_geom__$Point_Point_$Impl_$.equals = function(this1,p) {
	return this1.equals(p);
};
tannus_geom__$Point_Point_$Impl_$.nequals = function(this1,p) {
	return this1.nequals(p);
};
tannus_geom__$Point_Point_$Impl_$.vectorize = function(this1,r) {
	var tmp;
	var tmp1;
	var what = this1.get_x();
	tmp1 = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
	var x = tmp1;
	var tmp2;
	var what1 = this1.get_y();
	tmp2 = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
	var y = tmp2;
	tmp = new tannus_geom_TPoint(x,y,0);
	return tmp;
};
tannus_geom__$Point_Point_$Impl_$.devectorize = function(this1,r) {
	var tmp;
	var f = this1.get_x();
	tmp = f;
	var px = tmp;
	var tmp1;
	var f1 = this1.get_y();
	tmp1 = f1;
	var py = tmp1;
	return new tannus_geom_TPoint(r.width * (px / 100),r.height * (py / 100),0);
};
tannus_geom__$Point_Point_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_geom__$Point_Point_$Impl_$.toArray = function(this1) {
	return this1.toArray();
};
tannus_geom__$Point_Point_$Impl_$.fromFloatArray = function(a) {
	return tannus_geom_TPoint.fromFloatArray(a);
};
tannus_geom__$Point_Point_$Impl_$.fromIntArray = function(a) {
	return tannus_geom_TPoint.fromFloatArray(a);
};
tannus_geom__$Point_Point_$Impl_$.perc = function(what,of) {
	return tannus_math__$Percent_Percent_$Impl_$.percent(what,of);
};
tannus_geom__$Point_Point_$Impl_$.createLinked = function(x,y,z) {
	return new tannus_geom_LinkedPoint(x,y,z);
};
tannus_geom__$Point_Point_$Impl_$.createLinkedFromPointRef = function(p) {
	var x = new tannus_io__$Pointer_Ref(function() {
		var tmp;
		var this1 = p();
		tmp = this1.get_x();
		return tmp;
	},function(v) {
		var tmp1;
		var this2 = p();
		tmp1 = this2.set_x(v);
		return tmp1;
	});
	var y = new tannus_io__$Pointer_Ref(function() {
		var tmp2;
		var this3 = p();
		tmp2 = this3.get_y();
		return tmp2;
	},function(v1) {
		var tmp3;
		var this4 = p();
		tmp3 = this4.set_y(v1);
		return tmp3;
	});
	var z = new tannus_io__$Pointer_Ref(function() {
		var tmp4;
		var this5 = p();
		tmp4 = this5.get_z();
		return tmp4;
	},function(v2) {
		var tmp5;
		var this6 = p();
		tmp5 = this6.set_z(v2);
		return tmp5;
	});
	return new tannus_geom_LinkedPoint(x,y,z);
};
var tannus_geom_TPoint = function(x,y,z) {
	this._x = x;
	this._y = y;
	this._z = z;
};
$hxClasses["tannus.geom.TPoint"] = tannus_geom_TPoint;
tannus_geom_TPoint.__name__ = ["tannus","geom","TPoint"];
tannus_geom_TPoint.__interfaces__ = [tannus_ds_Comparable];
tannus_geom_TPoint.fromFloatArray = function(a) {
	var ma = a;
	var tmp;
	var this1 = ma[0];
	if(this1 != null) tmp = this1; else tmp = 0;
	var tmp1;
	var this2 = ma[1];
	if(this2 != null) tmp1 = this2; else tmp1 = 0;
	var tmp2;
	var this3 = ma[2];
	if(this3 != null) tmp2 = this3; else tmp2 = 0;
	return new tannus_geom_TPoint(tmp,tmp1,tmp2);
};
tannus_geom_TPoint.prototype = {
	angleTo: function(other) {
		var tmp;
		var tmp1;
		var x1 = this.get_x();
		var y1 = this.get_y();
		var x2 = other.get_x();
		var y2 = other.get_y();
		var radians = Math.atan2(y2 - y1,x2 - x1);
		tmp1 = radians * 180 / 3.141592653589793;
		var v = tmp1;
		tmp = new tannus_geom_CAngle(v);
		return tmp;
	}
	,distanceFrom: function(other) {
		return Math.sqrt(Math.pow(Math.abs(this.get_x() - other.get_x()),2) + Math.pow(Math.abs(this.get_y() - other.get_y()),2));
	}
	,copyFrom: function(p) {
		this.set_x(p.get_x());
		this.set_y(p.get_y());
		this.set_z(p.get_z());
	}
	,plusPoint: function(other) {
		var tmp;
		var x = this.get_x() + other.get_x();
		var y = this.get_y() + other.get_y();
		var z = this.get_z() + other.get_z();
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,plusFloat: function(n) {
		var tmp;
		var x = this.get_x() + n;
		var y = this.get_y() + n;
		var z = this.get_z() + n;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,moveByPoint: function(other) {
		var _g = this;
		_g.set_x(_g.get_x() + other.get_x());
		var _g1 = this;
		_g1.set_y(_g1.get_y() + other.get_y());
		var _g2 = this;
		_g2.set_z(_g2.get_z() + other.get_z());
		return this;
	}
	,moveByFloat: function(n) {
		var _g = this;
		_g.set_x(_g.get_x() + n);
		var _g1 = this;
		_g1.set_y(_g1.get_y() + n);
		var _g2 = this;
		_g2.set_z(_g2.get_z() + n);
		return this;
	}
	,minusPoint: function(other) {
		var tmp;
		var x = this.get_x() - other.get_x();
		var y = this.get_y() - other.get_y();
		var z = this.get_z() - other.get_z();
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,minusFloat: function(n) {
		var tmp;
		var x = this.get_x() - n;
		var y = this.get_y() - n;
		var z = this.get_z() - n;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,iminusPoint: function(other) {
		this.moveByPoint(other.negate());
		return this;
	}
	,iminusFloat: function(n) {
		this.moveByFloat(-n);
		return this;
	}
	,dividePoint: function(d) {
		var tmp;
		var x = this.get_x() / d.get_x();
		var y = this.get_y() / d.get_y();
		var z = this.get_z() != 0?this.get_z() / d.get_z():0;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,divideFloat: function(f) {
		var tmp;
		var x = this.get_x() / f;
		var y = this.get_y() / f;
		var z = this.get_z() != 0?this.get_z() / f:0;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,multPoint: function(p) {
		var tmp;
		var x = this.get_x() * p.get_x();
		var y = this.get_y() * p.get_y();
		var z = this.get_z() * p.get_z();
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,multFloat: function(n) {
		var tmp;
		var x = this.get_x() * n;
		var y = this.get_y() * n;
		var z = this.get_z() * n;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,negate: function() {
		return this.multFloat(-1);
	}
	,clone: function() {
		var tmp;
		var x = this.get_x();
		var y = this.get_y();
		var z = this.get_z();
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,clamp: function() {
		var tmp;
		var f = this.get_x();
		tmp = f | 0;
		this.set_x(tmp);
		var tmp1;
		var f1 = this.get_y();
		tmp1 = f1 | 0;
		this.set_y(tmp1);
		var tmp2;
		var f2 = this.get_z();
		tmp2 = f2 | 0;
		this.set_z(tmp2);
	}
	,clamped: function() {
		var tmp;
		var tmp1;
		var f = this.get_x();
		tmp1 = f | 0;
		var x = tmp1;
		var tmp2;
		var f1 = this.get_y();
		tmp2 = f1 | 0;
		var y = tmp2;
		var tmp3;
		var f2 = this.get_z();
		tmp3 = f2 | 0;
		var z = tmp3;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,lerp: function(other,weight) {
		var tmp;
		var tmp1;
		var a = this.get_x();
		var b = other.get_x();
		tmp1 = a + weight * (b - a);
		var x = tmp1;
		var tmp2;
		var a1 = this.get_y();
		var b1 = other.get_y();
		tmp2 = a1 + weight * (b1 - a1);
		var y = tmp2;
		var tmp3;
		var a2 = this.get_z();
		var b2 = other.get_z();
		tmp3 = a2 + weight * (b2 - a2);
		var z = tmp3;
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,mutate: function(f) {
		var tmp;
		var x = f(this.get_x());
		var y = f(this.get_y());
		var z = f(this.get_z());
		tmp = new tannus_geom_TPoint(x,y,z);
		return tmp;
	}
	,imutate: function(f) {
		this.set_x(f(this.get_x()));
		this.set_y(f(this.get_y()));
		this.set_z(f(this.get_z()));
		return this;
	}
	,equals: function(other) {
		return this.get_x() == other.get_x() && this.get_y() == other.get_y() && this.get_z() == other.get_z();
	}
	,nequals: function(other) {
		return !this.equals(other);
	}
	,toString: function() {
		return "Point(" + this.get_x() + ", " + this.get_y() + ", " + this.get_z() + ")";
	}
	,toArray: function() {
		return [this.get_x(),this.get_y(),this.get_z()];
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,get_z: function() {
		return this._z;
	}
	,set_x: function(v) {
		return this._x = v;
	}
	,set_y: function(v) {
		return this._y = v;
	}
	,set_z: function(v) {
		return this._z = v;
	}
	,__class__: tannus_geom_TPoint
	,__properties__: {set_z:"set_z",get_z:"get_z",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var tannus_geom_LinkedPoint = function(x,y,z) {
	var _g = this;
	tannus_geom_TPoint.call(this,0,0,0);
	this.rx = x;
	this.ry = y;
	this.rz = z != null?z:new tannus_io__$Pointer_Ref(function() {
		return _g._z;
	},function(v) {
		return _g._z = v;
	});
};
$hxClasses["tannus.geom.LinkedPoint"] = tannus_geom_LinkedPoint;
tannus_geom_LinkedPoint.__name__ = ["tannus","geom","LinkedPoint"];
tannus_geom_LinkedPoint.__super__ = tannus_geom_TPoint;
tannus_geom_LinkedPoint.prototype = $extend(tannus_geom_TPoint.prototype,{
	get_x: function() {
		return this.rx.get();
	}
	,get_y: function() {
		return this.ry.get();
	}
	,get_z: function() {
		return this.rz.get();
	}
	,set_x: function(v) {
		return this.rx.set(v);
	}
	,set_y: function(v) {
		return this.ry.set(v);
	}
	,set_z: function(v) {
		return this.rz.set(v);
	}
	,__class__: tannus_geom_LinkedPoint
});
var tannus_geom__$Rectangle_Rectangle_$Impl_$ = {};
$hxClasses["tannus.geom._Rectangle.Rectangle_Impl_"] = tannus_geom__$Rectangle_Rectangle_$Impl_$;
tannus_geom__$Rectangle_Rectangle_$Impl_$.__name__ = ["tannus","geom","_Rectangle","Rectangle_Impl_"];
tannus_geom__$Rectangle_Rectangle_$Impl_$._new = function(_x,_y,_width,_height) {
	if(_height == null) _height = 0;
	if(_width == null) _width = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	return new tannus_geom_CRectangle(_x,_y,_width,_height);
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.eq = function(this1,o) {
	return this1.equals(o);
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.floatDiv = function(this1,o) {
	return this1.divide(tannus_ds__$EitherType_EitherType_$Impl_$.fromL(o));
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.rectDiv = function(this1,r) {
	var tmp;
	var e = tannus_ds_Either.Right(r);
	tmp = e;
	return this1.divide(tmp);
};
tannus_geom__$Rectangle_Rectangle_$Impl_$.fromArray = function(a) {
	switch(a.length) {
	case 2:
		var h = a[1];
		var w = a[0];
		return new tannus_geom_CRectangle(0,0,w,h);
	case 4:
		var h1 = a[3];
		var w1 = a[2];
		var y = a[1];
		var x = a[0];
		return new tannus_geom_CRectangle(x,y,w1,h1);
	default:
		return new tannus_geom_CRectangle(a[0],a[1],a[2],a[3]);
	}
};
var tannus_geom_Shape = function() { };
$hxClasses["tannus.geom.Shape"] = tannus_geom_Shape;
tannus_geom_Shape.__name__ = ["tannus","geom","Shape"];
tannus_geom_Shape.prototype = {
	__class__: tannus_geom_Shape
};
var tannus_geom_CRectangle = function(_x,_y,_width,_height) {
	if(_height == null) _height = 0;
	if(_width == null) _width = 0;
	if(_y == null) _y = 0;
	if(_x == null) _x = 0;
	this.x = _x;
	this.y = _y;
	this.z = 0;
	this.width = _width;
	this.height = _height;
	this.depth = 0;
};
$hxClasses["tannus.geom.CRectangle"] = tannus_geom_CRectangle;
tannus_geom_CRectangle.__name__ = ["tannus","geom","CRectangle"];
tannus_geom_CRectangle.__interfaces__ = [tannus_geom_Shape];
tannus_geom_CRectangle.perc = function(what,of) {
	return tannus_math__$Percent_Percent_$Impl_$.percent(what,of);
};
tannus_geom_CRectangle.prototype = {
	clone: function() {
		var r = new tannus_geom_CRectangle(this.x,this.y,this.width,this.height);
		r.z = this.z;
		r.depth = this.depth;
		return r;
	}
	,cloneFrom: function(other) {
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		this.width = other.width;
		this.height = other.height;
		this.depth = other.depth;
	}
	,equals: function(other) {
		return this.x == other.x && this.y == other.y && this.z == other.z && this.width == other.width && this.height == other.height && this.depth == other.depth;
	}
	,divide: function(div) {
		{
			var _g = div;
			switch(_g[1]) {
			case 0:
				var f = _g[2];
				return new tannus_geom_CRectangle(this.x,this.y,this.width / f,this.height / f);
			case 1:
				var r = _g[2];
				return new tannus_geom_CRectangle(this.x,this.y,this.width / r.width,this.height / r.height);
			}
		}
	}
	,contains: function(ox,oy) {
		return ox > this.x && ox < this.x + this.width && (oy > this.y && oy < this.y + this.height);
	}
	,containsPoint: function(point) {
		var tmp;
		var ox = point.get_x();
		var oy = point.get_y();
		if(ox > this.x && ox < this.x + this.width) {
			if(oy > this.y) tmp = oy < this.y + this.height; else tmp = false;
		} else tmp = false;
		return tmp;
	}
	,containsRect: function(o) {
		var tmp;
		var point = new tannus_geom_TPoint(o.x + o.width / 2,o.y + o.height / 2,0);
		var ox = point.get_x();
		var oy = point.get_y();
		if(ox > this.x && ox < this.x + this.width) {
			if(oy > this.y) tmp = oy < this.y + this.height; else tmp = false;
		} else tmp = false;
		if(tmp) return true; else {
			var _g = 0;
			var _g1 = o.get_corners();
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				var tmp1;
				var ox1 = p.get_x();
				var oy1 = p.get_y();
				if(ox1 > this.x && ox1 < this.x + this.width) {
					if(oy1 > this.y) tmp1 = oy1 < this.y + this.height; else tmp1 = false;
				} else tmp1 = false;
				if(tmp1) return true;
			}
			return false;
		}
	}
	,enlarge: function(dw,dh) {
		var _g = this;
		_g.width = _g.width + dw;
		var _g1 = this;
		_g1.height = _g1.height + dh;
		this.x -= dw / 2;
		this.y -= dh / 2;
	}
	,move: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,scale: function(sw,sh) {
		if(sw != null) {
			var ratio = sw / this.width;
			this.width = sw;
			this.height = ratio * this.height;
		} else if(sh != null) {
			var ratio1 = sh / this.height;
			this.width = ratio1 * this.width;
			this.height = sh;
		} else return;
	}
	,scaled: function(sw,sh) {
		var s = this.clone();
		s.scale(sw,sh);
		return s;
	}
	,percentScale: function(amount) {
		this.width = this.width * (amount / 100);
		this.height = this.height * (amount / 100);
	}
	,percentScaled: function(amount) {
		return new tannus_geom_CRectangle(this.x,this.y,this.width * (amount / 100),this.height * (amount / 100));
	}
	,rotated: function(angle) {
		var rads = angle.v * Math.PI / 180;
		var nw = Math.abs(this.width * Math.sin(rads) + Math.abs(this.height * Math.cos(rads)));
		var nh = Math.abs(this.width * Math.cos(rads) + Math.abs(this.height * Math.sin(rads)));
		return new tannus_geom_CRectangle(this.x,this.y,nw,nh);
	}
	,split: function(count,vertical) {
		if(vertical == null) vertical = true;
		var all = [];
		if(vertical) {
			var ph = this.height / count;
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				all.push(new tannus_geom_CRectangle(this.x,this.y + i * ph,this.width,ph));
			}
		} else {
			var pw = this.width / count;
			var _g1 = 0;
			while(_g1 < count) {
				var i1 = _g1++;
				all.push(new tannus_geom_CRectangle(this.x + i1 * pw,this.y,pw,this.height));
			}
		}
		return all;
	}
	,split2: function(count) {
		return this.split(count,true).map(function(r) {
			return r.split(count,false);
		});
	}
	,bisect: function(mode) {
		if(mode == null) mode = true;
		var pair = [];
		if(mode) {
			pair.push(new tannus_geom_Triangle(new tannus_geom_TPoint(this.x,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0)));
			pair.push(new tannus_geom_Triangle(new tannus_geom_TPoint(this.x,this.y,0),new tannus_geom_TPoint(this.x,this.y + this.height,0),new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0)));
		} else {
			pair.push(new tannus_geom_Triangle(new tannus_geom_TPoint(this.x + this.width,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0),new tannus_geom_TPoint(this.x,this.y + this.height,0)));
			pair.push(new tannus_geom_Triangle(new tannus_geom_TPoint(this.x,this.y + this.height,0),new tannus_geom_TPoint(this.x,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y,0)));
		}
		return pair;
	}
	,bisect2: function() {
		return tannus_ds_ArrayTools.flatten(this.bisect().map(function(t) {
			return t.bisect();
		}));
	}
	,crop: function(cr) {
		var corners = cr.get_corners().map($bind(this,this.containsPoint));
		if(Lambda.has(corners,false)) return null;
		var left = new tannus_geom_CRectangle(this.x,this.y,cr.x - this.x,this.height);
		var top = new tannus_geom_CRectangle(cr.x,this.y,cr.width,cr.y - this.y);
		var bottom = new tannus_geom_CRectangle(cr.x,cr.y + cr.height,cr.width,this.y + this.height);
		bottom.height -= bottom.y;
		var right = new tannus_geom_CRectangle(cr.x + cr.width,this.y,0,this.height);
		right.width = this.x + this.width - right.x;
		return { 'top' : top, 'left' : left, 'bottom' : bottom, 'right' : right};
	}
	,vectorize: function(r) {
		var tmp;
		var this1 = new tannus_geom_TPoint(this.x,this.y,0);
		var tmp3;
		var what = this1.get_x();
		tmp3 = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
		var x = tmp3;
		var tmp4;
		var what1 = this1.get_y();
		tmp4 = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
		var y = tmp4;
		tmp = new tannus_geom_TPoint(x,y,0);
		var pos = tmp;
		var tmp1;
		var w = tannus_math__$Percent_Percent_$Impl_$.percent(this.width,r.width);
		var h = tannus_math__$Percent_Percent_$Impl_$.percent(this.height,r.height);
		tmp1 = [w,h];
		var dim = tmp1;
		var tmp2;
		var _x = pos.get_x();
		var _y = pos.get_y();
		tmp2 = new tannus_geom_CRectangle(_x,_y,dim[0],dim[1]);
		return tmp2;
	}
	,devectorize: function(r) {
		var px = this.x;
		var py = this.y;
		var pw = this.width;
		var ph = this.height;
		return new tannus_geom_CRectangle(r.width * (px / 100),r.height * (py / 100),r.width * (pw / 100),r.height * (ph / 100));
	}
	,getVertices: function(precision) {
		var self = this;
		var tmp;
		var v = [new tannus_geom_TPoint(self.x,self.y,0),new tannus_geom_TPoint(self.x + self.width,self.y,0),new tannus_geom_TPoint(self.x + self.width,self.y + self.height,0),new tannus_geom_TPoint(self.x,self.y + self.height,0)];
		tmp = new tannus_geom_VertexArray(v);
		var verts = tmp;
		return verts;
	}
	,getCornerPointers: function() {
		var _g = this;
		var result = [new tannus_io__$Pointer_Ref(function() {
			return new tannus_geom_TPoint(_g.x,_g.y,0);
		},function(v) {
			return _g.set_topLeft(v);
		}),new tannus_io__$Pointer_Ref(function() {
			return new tannus_geom_TPoint(_g.x + _g.width,_g.y,0);
		},function(v1) {
			return _g.set_topRight(v1);
		}),new tannus_io__$Pointer_Ref(function() {
			return new tannus_geom_TPoint(_g.x,_g.y + _g.height,0);
		},function(v2) {
			return _g.set_bottomLeft(v2);
		}),new tannus_io__$Pointer_Ref(function() {
			return new tannus_geom_TPoint(_g.x + _g.width,_g.y + _g.height,0);
		},function(v3) {
			return _g.set_bottomRight(v3);
		})];
		return result;
	}
	,layers: function() {
		var results = [];
		var _g1 = Math.round(this.z);
		var _g = Math.round(this.z + this.depth);
		while(_g1 < _g) {
			var i = _g1++;
			var layer = new tannus_geom_CRectangle(this.x,this.y,this.width,this.height);
			layer.z = i;
			results.push(layer);
		}
		return results;
	}
	,toString: function() {
		return "Rectangle(" + this.x + ", " + this.y + ", " + this.width + ", " + this.height + ")";
	}
	,get_position: function() {
		return new tannus_geom_TPoint(this.x,this.y,this.z);
	}
	,set_position: function(np) {
		this.x = np.get_x();
		this.y = np.get_y();
		this.z = np.get_z();
		return new tannus_geom_TPoint(this.x,this.y,this.z);
	}
	,get_corners: function() {
		return [new tannus_geom_TPoint(this.x,this.y,0),new tannus_geom_TPoint(this.x + this.width,this.y,0),new tannus_geom_TPoint(this.x,this.y + this.height,0),new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0)];
	}
	,get_area: function() {
		return this.width * this.height;
	}
	,get_centerX: function() {
		return this.x + this.width / 2;
	}
	,set_centerX: function(v) {
		return this.x = v - this.width / 2;
	}
	,get_centerY: function() {
		return this.y + this.height / 2;
	}
	,set_centerY: function(v) {
		return this.y = v - this.height / 2;
	}
	,get_center: function() {
		return new tannus_geom_TPoint(this.x + this.width / 2,this.y + this.height / 2,0);
	}
	,set_center: function(nc) {
		var v = nc.get_x();
		this.x = v - this.width / 2;
		var v1 = nc.get_y();
		this.y = v1 - this.height / 2;
		return nc;
	}
	,get_topRight: function() {
		return new tannus_geom_TPoint(this.x + this.width,this.y,0);
	}
	,set_topRight: function(v) {
		this.x = v.get_x() - this.width;
		this.y = v.get_y();
		return new tannus_geom_TPoint(this.x + this.width,this.y,0);
	}
	,get_topLeft: function() {
		return new tannus_geom_TPoint(this.x,this.y,0);
	}
	,set_topLeft: function(v) {
		this.x = v.get_x();
		this.y = v.get_y();
		return new tannus_geom_TPoint(this.x,this.y,0);
	}
	,get_bottomLeft: function() {
		return new tannus_geom_TPoint(this.x,this.y + this.height,0);
	}
	,set_bottomLeft: function(v) {
		this.x = v.get_x();
		this.y = v.get_y() - this.height;
		return new tannus_geom_TPoint(this.x,this.y + this.height,0);
	}
	,get_bottomRight: function() {
		return new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0);
	}
	,set_bottomRight: function(v) {
		this.x = v.get_x() - this.width;
		this.y = v.get_y() - this.height;
		return new tannus_geom_TPoint(this.x + this.width,this.y + this.height,0);
	}
	,get_w: function() {
		return this.width;
	}
	,set_w: function(nw) {
		return this.width = nw;
	}
	,get_h: function() {
		return this.height;
	}
	,set_h: function(nh) {
		return this.height = nh;
	}
	,get_d: function() {
		return this.depth;
	}
	,set_d: function(nd) {
		return this.depth = nd;
	}
	,__class__: tannus_geom_CRectangle
	,__properties__: {set_d:"set_d",get_d:"get_d",set_h:"set_h",get_h:"get_h",set_w:"set_w",get_w:"get_w",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_bottomLeft:"set_bottomLeft",get_bottomLeft:"get_bottomLeft",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft",set_topRight:"set_topRight",get_topRight:"get_topRight",set_center:"set_center",get_center:"get_center",set_centerY:"set_centerY",get_centerY:"get_centerY",set_centerX:"set_centerX",get_centerX:"get_centerX",get_area:"get_area",get_corners:"get_corners",set_position:"set_position",get_position:"get_position"}
};
var tannus_geom_Triangle = function(x,y,z) {
	this.one = x != null?x:new tannus_geom_TPoint(0,0,0);
	this.two = y != null?y:new tannus_geom_TPoint(0,0,0);
	this.three = z != null?z:new tannus_geom_TPoint(0,0,0);
};
$hxClasses["tannus.geom.Triangle"] = tannus_geom_Triangle;
tannus_geom_Triangle.__name__ = ["tannus","geom","Triangle"];
tannus_geom_Triangle.__interfaces__ = [tannus_geom_Shape];
tannus_geom_Triangle.prototype = {
	clone: function() {
		return new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
	}
	,bisect: function() {
		var tmp;
		var _this = new tannus_geom_Line(this.one,this.three);
		tmp = _this.one.lerp(_this.two,0.5);
		var mp = tmp;
		var l = new tannus_geom_Triangle(this.one,this.two,mp);
		var r = new tannus_geom_Triangle(mp,this.two,this.three);
		return [l,r];
	}
	,containsPoint: function(p) {
		var a = this.three.minusPoint(this.one);
		var b = this.two.minusPoint(this.one);
		var c = p.minusPoint(this.one);
		var dot_aa = a.get_x() * a.get_x() + a.get_y() * a.get_y();
		var dot_ab = a.get_x() * b.get_x() + a.get_y() * b.get_y();
		var dot_ac = a.get_x() * c.get_x() + a.get_y() * c.get_y();
		var dot_bb = b.get_x() * b.get_x() + b.get_y() * b.get_y();
		var dot_bc = b.get_x() * c.get_x() + b.get_y() * c.get_y();
		var invDenom = 1 / (dot_aa * dot_bb - dot_ab * dot_ab);
		var u = (dot_bb * dot_ac - dot_ab * dot_bc) * invDenom;
		var v = (dot_aa * dot_bc - dot_ab * dot_ac) * invDenom;
		return u >= 0 && v >= 0 && u + v < 1;
	}
	,dot: function(x,y) {
		return x.get_x() * y.get_x() + x.get_y() * y.get_y();
	}
	,vectorize: function(r) {
		var c = new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
		var tmp;
		var this1 = this.one;
		var tmp3;
		var what = this1.get_x();
		tmp3 = tannus_math__$Percent_Percent_$Impl_$.percent(what,r.width);
		var x = tmp3;
		var tmp4;
		var what1 = this1.get_y();
		tmp4 = tannus_math__$Percent_Percent_$Impl_$.percent(what1,r.height);
		var y = tmp4;
		tmp = new tannus_geom_TPoint(x,y,0);
		c.one = tmp;
		var tmp1;
		var this2 = this.two;
		var tmp5;
		var what2 = this2.get_x();
		tmp5 = tannus_math__$Percent_Percent_$Impl_$.percent(what2,r.width);
		var x1 = tmp5;
		var tmp6;
		var what3 = this2.get_y();
		tmp6 = tannus_math__$Percent_Percent_$Impl_$.percent(what3,r.height);
		var y1 = tmp6;
		tmp1 = new tannus_geom_TPoint(x1,y1,0);
		c.two = tmp1;
		var tmp2;
		var this3 = this.three;
		var tmp7;
		var what4 = this3.get_x();
		tmp7 = tannus_math__$Percent_Percent_$Impl_$.percent(what4,r.width);
		var x2 = tmp7;
		var tmp8;
		var what5 = this3.get_y();
		tmp8 = tannus_math__$Percent_Percent_$Impl_$.percent(what5,r.height);
		var y2 = tmp8;
		tmp2 = new tannus_geom_TPoint(x2,y2,0);
		c.three = tmp2;
		return c;
	}
	,devectorize: function(r) {
		var c = new tannus_geom_Triangle(this.one.clone(),this.two.clone(),this.three.clone());
		c.one = tannus_geom__$Point_Point_$Impl_$.devectorize(this.one,r);
		c.two = tannus_geom__$Point_Point_$Impl_$.devectorize(this.two,r);
		c.three = tannus_geom__$Point_Point_$Impl_$.devectorize(this.three,r);
		return c;
	}
	,getVertices: function(precision) {
		var tmp;
		var lines = this.get_lines();
		var tmp1;
		var _g = [];
		var _g1 = 0;
		while(_g1 < lines.length) {
			var l = lines[_g1];
			++_g1;
			_g.push([l.one,l.two]);
		}
		tmp1 = _g;
		var v = tannus_ds_ArrayTools.flatten(tmp1);
		tmp = new tannus_geom_VertexArray(v);
		return tmp;
	}
	,get_center: function() {
		var cx = (this.one.get_x() + this.two.get_x() + this.three.get_x()) / 3;
		var cy = (this.one.get_y() + this.two.get_y() + this.three.get_y()) / 3;
		var cz = (this.one.get_z() + this.two.get_z() + this.three.get_z()) / 3;
		return new tannus_geom_TPoint(cx,cy,cz);
	}
	,get_lines: function() {
		var la = [];
		la.push(new tannus_geom_Line(this.one,this.two));
		la.push(new tannus_geom_Line(this.two,this.three));
		la.push(new tannus_geom_Line(this.three,this.one));
		return la;
	}
	,get_points: function() {
		return [this.one,this.two,this.three];
	}
	,set_points: function(v) {
		this.one = v[0];
		this.two = v[1];
		this.three = v[2];
		return [this.one,this.two,this.three];
	}
	,__class__: tannus_geom_Triangle
	,__properties__: {set_points:"set_points",get_points:"get_points",get_lines:"get_lines",get_center:"get_center"}
};
var tannus_geom__$Velocity_Velocity_$Impl_$ = {};
$hxClasses["tannus.geom._Velocity.Velocity_Impl_"] = tannus_geom__$Velocity_Velocity_$Impl_$;
tannus_geom__$Velocity_Velocity_$Impl_$.__name__ = ["tannus","geom","_Velocity","Velocity_Impl_"];
tannus_geom__$Velocity_Velocity_$Impl_$._new = function(speed,angle) {
	return new tannus_geom_CVelocity(speed,angle);
};
tannus_geom__$Velocity_Velocity_$Impl_$.invert = function(this1) {
	return this1.invert();
};
tannus_geom__$Velocity_Velocity_$Impl_$.plus = function(this1,other) {
	return this1.plus(other);
};
tannus_geom__$Velocity_Velocity_$Impl_$.minus = function(this1,other) {
	return this1.minus(other);
};
tannus_geom__$Velocity_Velocity_$Impl_$.toPoint = function(this1) {
	return this1.get_vector();
};
tannus_geom__$Velocity_Velocity_$Impl_$.fromPoint = function(p) {
	return tannus_geom_CVelocity.fromPoint(p);
};
var tannus_geom_CVelocity = function(speed,angle) {
	this.speed = speed;
	this.angle = angle;
};
$hxClasses["tannus.geom.CVelocity"] = tannus_geom_CVelocity;
tannus_geom_CVelocity.__name__ = ["tannus","geom","CVelocity"];
tannus_geom_CVelocity.fromVector = function(x,y) {
	return tannus_geom_CVelocity.fromPoint(new tannus_geom_TPoint(x,y,0));
};
tannus_geom_CVelocity.fromPoint = function(p) {
	var tmp;
	var angle = new tannus_geom_CAngle(0);
	tmp = new tannus_geom_CVelocity(0,angle);
	var vel = tmp;
	vel.set_vector(p);
	return vel;
};
tannus_geom_CVelocity.prototype = {
	setVector: function(vx,vy) {
		var e = new tannus_geom_TPoint(vx,vy,0);
		var l = new tannus_geom_Line(new tannus_geom_TPoint(0,0,0),e);
		this.speed = l.one.distanceFrom(l.two);
		var tmp;
		var tmp1;
		var x2 = e.get_x();
		var y2 = e.get_y();
		var radians = Math.atan2(y2,x2);
		tmp1 = radians * 180 / 3.141592653589793;
		var v = tmp1;
		tmp = new tannus_geom_CAngle(v);
		this.angle = tmp;
	}
	,clone: function() {
		return new tannus_geom_CVelocity(this.speed,this.angle);
	}
	,invert: function() {
		return tannus_geom_CVelocity.fromVector(-(Math.cos(this.angle.v * Math.PI / 180) * this.speed),-(Math.sin(this.angle.v * Math.PI / 180) * this.speed));
	}
	,plus: function(other) {
		var tmp;
		var this1 = this.get_vector();
		var other1 = other.get_vector();
		tmp = this1.plusPoint(other1);
		return tannus_geom_CVelocity.fromPoint(tmp);
	}
	,minus: function(other) {
		var tmp;
		var this1 = this.get_vector();
		var p = other.get_vector();
		tmp = this1.minusPoint(p);
		return tannus_geom_CVelocity.fromPoint(tmp);
	}
	,lerp: function(other,weight) {
		var vec = this.get_vector().lerp(other.get_vector(),weight);
		return tannus_geom_CVelocity.fromPoint(vec);
	}
	,get_x: function() {
		return Math.cos(this.angle.v * Math.PI / 180) * this.speed;
	}
	,set_x: function(nx) {
		this.setVector(nx,Math.sin(this.angle.v * Math.PI / 180) * this.speed);
		return nx;
	}
	,get_y: function() {
		return Math.sin(this.angle.v * Math.PI / 180) * this.speed;
	}
	,set_y: function(ny) {
		this.setVector(Math.cos(this.angle.v * Math.PI / 180) * this.speed,ny);
		return ny;
	}
	,get_vector: function() {
		var tmp;
		var x = Math.cos(this.angle.v * Math.PI / 180) * this.speed;
		var y = Math.sin(this.angle.v * Math.PI / 180) * this.speed;
		tmp = new tannus_geom_TPoint(x,y,0);
		return tmp;
	}
	,set_vector: function(v) {
		this.setVector(v.get_x(),v.get_y());
		return this.get_vector();
	}
	,__class__: tannus_geom_CVelocity
	,__properties__: {set_vector:"set_vector",get_vector:"get_vector",set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x"}
};
var tannus_geom_VertexArray = function(v) {
	this.set_data(v != null?v.slice():[]);
	this._lines = new tannus_ds_CPair(null,null);
	this._rect = null;
};
$hxClasses["tannus.geom.VertexArray"] = tannus_geom_VertexArray;
tannus_geom_VertexArray.__name__ = ["tannus","geom","VertexArray"];
tannus_geom_VertexArray.prototype = {
	resetCache: function() {
		this._lines = new tannus_ds_CPair(null,null);
		this._rect = null;
	}
	,get: function(i) {
		return this.data[i];
	}
	,set: function(i,p) {
		this.data[i] = p.clone();
		this.resetCache();
		return this.get(i);
	}
	,toImmutable: function(p) {
		if(!js_Boot.__instanceof(p,tannus_geom_ImmutablePoint)) {
			var np = new tannus_geom_ImmutablePoint(p.get_x(),p.get_y(),p.get_z());
			return np;
		} else return p.clone();
	}
	,toMutable: function(p) {
		if(js_Boot.__instanceof(p,tannus_geom_ImmutablePoint)) {
			var np = new tannus_geom_TPoint(0,0,0);
			np.copyFrom(p);
			return np;
		} else return p;
	}
	,iterator: function() {
		return new tannus_geom_VerticeIterator(this);
	}
	,push: function(p) {
		this.resetCache();
		return this.data.push(p.clone());
	}
	,pop: function() {
		this.resetCache();
		return this.data.pop();
	}
	,unshift: function(p) {
		this.resetCache();
		this.data.unshift(p.clone());
		return this.data.length;
	}
	,shift: function() {
		this.resetCache();
		return this.data.shift();
	}
	,concat: function(other) {
		var tmp;
		var v = this.data.concat(other.data);
		tmp = new tannus_geom_VertexArray(v);
		return tmp;
	}
	,append: function(other) {
		this.resetCache();
		this.set_data(this.data.concat(other.data));
		return new tannus_geom_VertexArray(this.data);
	}
	,clone: function() {
		return new tannus_geom_VertexArray(this.data);
	}
	,calculateLines: function(close) {
		if(close == null) close = false;
		var cached = close?this._lines.right:this._lines.left;
		if(cached != null) return cached; else {
			var lines = [];
			var i = 0;
			var last = null;
			while(i < this.data.length) {
				var start = this.data[i];
				if(last == null) last = start; else {
					lines.push(new tannus_geom_Line(last,start));
					last = start;
				}
				i++;
			}
			if(close) {
				lines.push(new tannus_geom_Line(tannus_ds_ArrayTools.last(this.data),this.data[0]));
				this._lines.right = lines;
			} else this._lines.left = lines;
			return lines;
		}
	}
	,lineStack: function(close) {
		if(close == null) close = false;
		return new tannus_ds_Stack(this.calculateLines(close));
	}
	,pointStack: function() {
		var rdat = this.data.slice();
		rdat.reverse();
		return new tannus_ds_Stack(rdat);
	}
	,simplify: function(threshold) {
		if(threshold == null) threshold = 2;
		var lines = this.calculateLines();
		var ndata = [];
		var _g = 0;
		while(_g < lines.length) {
			var line = lines[_g];
			++_g;
			if(Math.round(line.one.distanceFrom(line.two)) <= threshold) ndata.push(line.one.lerp(line.two,0.5)); else {
				ndata.push(line.one);
				ndata.push(line.two);
			}
		}
		this.set_data(ndata);
	}
	,each: function(f) {
		var points = this.pointStack();
		while(!points.get_empty()) {
			var p = points.pop();
			f(p);
		}
		this.resetCache();
	}
	,apply: function(m) {
		this.set_data(this.data.map(function(p) {
			return m.transformPoint(p);
		}));
	}
	,map: function(f) {
		return new tannus_geom_VertexArray(this.data.map(f));
	}
	,getContainingRect: function() {
		if(this._rect == null) {
			var xr = tannus_math_TMath.minmax(this.data,function(p) {
				return p.get_x();
			});
			var yr = tannus_math_TMath.minmax(this.data,function(p1) {
				return p1.get_y();
			});
			this._rect = new tannus_geom_CRectangle(xr.min,yr.min,xr.max - xr.min,yr.max - yr.min);
		}
		return this._rect;
	}
	,get_length: function() {
		return this.data.length;
	}
	,get_lines: function() {
		return this.calculateLines(true);
	}
	,get_rect: function() {
		return this.getContainingRect();
	}
	,get_first: function() {
		return this.get(0);
	}
	,get_last: function() {
		return this.get(this.data.length - 1);
	}
	,set_data: function(plist) {
		if(plist != this.data) this.resetCache();
		return this.data = plist;
	}
	,__class__: tannus_geom_VertexArray
	,__properties__: {set_data:"set_data",get_last:"get_last",get_first:"get_first",get_rect:"get_rect",get_lines:"get_lines",get_length:"get_length"}
};
var tannus_geom_VerticeIterator = function(va) {
	this.array = va;
	this.iter = new IntIterator(0,this.array.data.length);
};
$hxClasses["tannus.geom.VerticeIterator"] = tannus_geom_VerticeIterator;
tannus_geom_VerticeIterator.__name__ = ["tannus","geom","VerticeIterator"];
tannus_geom_VerticeIterator.prototype = {
	hasNext: function() {
		var tmp;
		var _this = this.iter;
		tmp = _this.min < _this.max;
		return tmp;
	}
	,next: function() {
		return this.array.get(this.iter.min++);
	}
	,__class__: tannus_geom_VerticeIterator
};
var tannus_geom_ImmutablePoint = function(x,y,z) {
	tannus_geom_TPoint.call(this,x,y,z);
};
$hxClasses["tannus.geom.ImmutablePoint"] = tannus_geom_ImmutablePoint;
tannus_geom_ImmutablePoint.__name__ = ["tannus","geom","ImmutablePoint"];
tannus_geom_ImmutablePoint.__super__ = tannus_geom_TPoint;
tannus_geom_ImmutablePoint.prototype = $extend(tannus_geom_TPoint.prototype,{
	set_x: function(v) {
		return v;
	}
	,set_y: function(v) {
		return v;
	}
	,set_z: function(v) {
		return v;
	}
	,write: function(p) {
		this._x = p.get_x();
		this._y = p.get_y();
		this._z = p.get_z();
	}
	,__class__: tannus_geom_ImmutablePoint
});
var tannus_geom__$Vertices_Vertices_$Impl_$ = {};
$hxClasses["tannus.geom._Vertices.Vertices_Impl_"] = tannus_geom__$Vertices_Vertices_$Impl_$;
tannus_geom__$Vertices_Vertices_$Impl_$.__name__ = ["tannus","geom","_Vertices","Vertices_Impl_"];
tannus_geom__$Vertices_Vertices_$Impl_$._new = function(v) {
	return new tannus_geom_VertexArray(v);
};
tannus_geom__$Vertices_Vertices_$Impl_$.clone = function(this1) {
	return this1.clone();
};
tannus_geom__$Vertices_Vertices_$Impl_$.map = function(this1,f) {
	return this1.map(f);
};
tannus_geom__$Vertices_Vertices_$Impl_$.get = function(this1,i) {
	return this1.get(i);
};
tannus_geom__$Vertices_Vertices_$Impl_$.set = function(this1,i,p) {
	return this1.set(i,p);
};
tannus_geom__$Vertices_Vertices_$Impl_$.isum = function(this1,other) {
	return this1.append(other);
};
tannus_geom__$Vertices_Vertices_$Impl_$.sum = function(this1,other) {
	var tmp;
	var v = this1.data.concat(other.data);
	tmp = new tannus_geom_VertexArray(v);
	return tmp;
};
tannus_geom__$Vertices_Vertices_$Impl_$.toPoints = function(this1) {
	var tmp;
	var _g = [];
	var $it0 = this1.iterator();
	while( $it0.hasNext() ) {
		var p = $it0.next();
		_g.push(p.clone());
	}
	tmp = _g;
	return tmp;
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromPoints = function(list) {
	return new tannus_geom_VertexArray(list);
};
tannus_geom__$Vertices_Vertices_$Impl_$.toLines = function(this1) {
	return this1.calculateLines(true);
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromLines = function(lines) {
	var tmp;
	var tmp1;
	var _g = [];
	var _g1 = 0;
	while(_g1 < lines.length) {
		var l = lines[_g1];
		++_g1;
		_g.push([l.one,l.two]);
	}
	tmp1 = _g;
	var v = tannus_ds_ArrayTools.flatten(tmp1);
	tmp = new tannus_geom_VertexArray(v);
	return tmp;
};
tannus_geom__$Vertices_Vertices_$Impl_$.fromShape = function(s) {
	return s.getVertices();
};
var tannus_html_JSTools = function() { };
$hxClasses["tannus.html.JSTools"] = tannus_html_JSTools;
tannus_html_JSTools.__name__ = ["tannus","html","JSTools"];
tannus_html_JSTools.arrayify = function(o) {
	return Array.prototype.slice.call(o,0);
};
tannus_html_JSTools.defineGetter = function(o,name,value) {
	var tmp;
	var tmp1;
	if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + "__defineGetter__"])) tmp = o[tmp1](); else tmp = o.__defineGetter__;
	tmp.call(o,name,value);
};
tannus_html_JSTools.defineSetter = function(o,name,value) {
	var tmp;
	var tmp1;
	if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + "__defineSetter__"])) tmp = o[tmp1](); else tmp = o.__defineSetter__;
	tmp.call(o,name,value);
};
tannus_html_JSTools.definePointer = function(o,name,value) {
	var tmp;
	var tmp2;
	if(o == null) tmp = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + "__defineGetter__"])) tmp = o[tmp2](); else tmp = o.__defineGetter__;
	tmp.call(o,name,value.getter);
	var tmp1;
	var tmp3;
	if(o == null) tmp1 = null; else if(o.__properties__ && (tmp3 = o.__properties__["get_" + "__defineSetter__"])) tmp1 = o[tmp3](); else tmp1 = o.__defineSetter__;
	tmp1.call(o,name,value.setter);
};
var tannus_internal_TypeTools = $hx_exports.TypeTools = function() { };
$hxClasses["tannus.internal.TypeTools"] = tannus_internal_TypeTools;
tannus_internal_TypeTools.__name__ = ["tannus","internal","TypeTools"];
tannus_internal_TypeTools.typename = function(o) {
	var valtype = Type["typeof"](o);
	switch(valtype[1]) {
	case 3:
		return "Bool";
	case 2:case 1:
		return "Number";
	case 0:
		return "Null";
	case 5:
		return "Function";
	case 8:
		return "Unknown";
	case 6:
		try {
			var name = Type.getClassName(valtype[2]);
			return name;
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			if( js_Boot.__instanceof(err,String) ) {
				return "Unknown";
			} else throw(err);
		}
		break;
	case 7:
		var enumer = valtype[2];
		var enumName = Type.getEnumName(enumer);
		var valueNames = Type.getEnumConstructs(enumer);
		var index = o[1];
		var results = "" + enumName + "." + valueNames[index];
		return results;
	case 4:
		try {
			var name1 = Type.getClassName(o);
			if(name1 != null) return "Class<" + name1 + ">"; else throw new js__$Boot_HaxeError("failed!");
		} catch( err1 ) {
			if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
			if( js_Boot.__instanceof(err1,String) ) {
				try {
					var name2 = Type.getEnumName(o);
					if(name2 != null) return "Enum<" + name2 + ">"; else throw new js__$Boot_HaxeError("failed!");
				} catch( err2 ) {
					if (err2 instanceof js__$Boot_HaxeError) err2 = err2.val;
					return "Unknown";
				}
			} else throw(err1);
		}
		break;
	}
};
tannus_internal_TypeTools.getClassHierarchy = function(klass) {
	var kl = klass;
	var hierarchy = [];
	var name = Type.getClassName(klass);
	hierarchy.push(name);
	while(true) try {
		kl = Type.getSuperClass(kl);
		name = Type.getClassName(kl);
		hierarchy.push(name);
	} catch( err ) {
		if (err instanceof js__$Boot_HaxeError) err = err.val;
		break;
	}
	return hierarchy;
};
tannus_internal_TypeTools.hierarchy = function(o) {
	if(Reflect.isObject(o)) {
		var tmp;
		if(o == null) tmp = null; else tmp = js_Boot.getClass(o);
		var klass = tmp;
		if(klass != null) return tannus_internal_TypeTools.getClassHierarchy(klass);
	}
	return [];
};
var tannus_io_Asserts = function() { };
$hxClasses["tannus.io.Asserts"] = tannus_io_Asserts;
tannus_io_Asserts.__name__ = ["tannus","io","Asserts"];
var tannus_io_Binary = function(size,_b) {
	this._length = size;
	this.b = _b;
	this.position = 0;
};
$hxClasses["tannus.io.Binary"] = tannus_io_Binary;
tannus_io_Binary.__name__ = ["tannus","io","Binary"];
tannus_io_Binary.prototype = {
	get: function(index) {
		if(index >= this._length || index < 0) throw new js__$Boot_HaxeError(tannus_io_impl_BinaryError.OutOfBounds);
		return 0;
	}
	,set: function(index,value) {
		if(index >= this._length || index < 0) throw new js__$Boot_HaxeError(tannus_io_impl_BinaryError.OutOfBounds);
		return 0;
	}
	,getInt32: function(i) {
		return this.get(i) | this.get(i + 1) << 8 | this.get(i + 2) << 16 | this.get(i + 3) << 24;
	}
	,setInt32: function(i,v) {
		this.set(i,v);
		this.set(i + 1,v >> 8);
		this.set(i + 2,v >> 16);
		this.set(i + 3,v >> 24);
	}
	,getInt64: function(i) {
		var tmp;
		var high = this.getInt32(i + 4);
		var low = this.getInt32(i);
		var x = new haxe__$Int64__$_$_$Int64(high,low);
		tmp = x;
		return tmp;
	}
	,setInt64: function(i,v) {
		this.setInt32(i,v.low);
		this.setInt32(i + 4,v.high);
	}
	,getFloat: function(i) {
		return tannus_math_TMath.i32ToFloat(this.getInt32(i));
	}
	,setFloat: function(i,v) {
		this.setInt32(i,tannus_math_TMath.floatToI32(v));
	}
	,fill: function(c,index,size) {
		if(index == null) index = 0;
		if(size == null) size = this._length;
		var _g = index;
		while(_g < size) {
			var i = _g++;
			this.set(i,c);
		}
	}
	,readByte: function() {
		return this.get(this.position++);
	}
	,readInt32: function() {
		var v = this.getInt32(this.position);
		this.position += 4;
		return v;
	}
	,writeInt32: function(i) {
		this.setInt32(this.position,i);
		this.position += 4;
	}
	,readFloat: function() {
		return tannus_math_TMath.i32ToFloat(this.readInt32());
	}
	,writeFloat: function(v) {
		this.writeInt32(tannus_math_TMath.floatToI32(v));
	}
	,writeByte: function(c) {
		this.set(this.position++,c);
	}
	,read: function(len) {
		var res = this.sub(this.position,len);
		this.position += len;
		return res;
	}
	,readString: function(len) {
		var res = this.getString(this.position,len);
		this.position += len;
		return res;
	}
	,write: function(other,len) {
		if(len == null) len = other._length;
		this.blit(this.position,other,0,len);
		this.position += len;
	}
	,writeString: function(s) {
		var tmp;
		var o = js_Boot.getClass(this);
		var tmp1;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + "ofString"])) tmp = o[tmp1](); else tmp = o.ofString;
		this.write(tmp(s));
	}
	,push: function(c) {
		this.position = this._length;
		this.resize(this._length + 1);
		this;
		this.setData(this.b);
		this.set(this.position++,c);
		return this.position;
	}
	,pushInt32: function(i) {
		this.position = this._length;
		this.resize(this._length + 4);
		this;
		this.setData(this.b);
		this.writeInt32(i);
		return this.position;
	}
	,pushFloat: function(n) {
		return this.pushInt32(tannus_math_TMath.floatToI32(n));
	}
	,unshift: function(c) {
		this.shiftRight(1);
		this.setData(this.b);
		this.set(0,c);
		return 0;
	}
	,pop: function() {
		var v = this.get(this._length - 1);
		this.position = 0;
		this.resize(this._length - 1);
		this.setData(this.b);
		return v;
	}
	,shift: function() {
		var v = this.get(0);
		this.setData(this.copy().slice(1).b);
		return v;
	}
	,append: function(footer,len) {
		if(len == null) len = footer._length;
		this.position = this._length;
		this.resize(this._length + len);
		this;
		this.write(footer);
		return this;
	}
	,appendString: function(foot,len) {
		var tmp;
		var o = js_Boot.getClass(this);
		var tmp1;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + "ofString"])) tmp = o[tmp1](); else tmp = o.ofString;
		return this.append(tmp(foot),len);
	}
	,appendStruct: function(od) {
		var o = tannus_ds_CObj.create(od);
		if(Object.prototype.hasOwnProperty.call(o.o,"_append_ba")) {
			var tmp;
			var tmp1;
			var _e = o.o;
			tmp1 = function(func,args) {
				return func.apply(_e,args);
			};
			var f = tmp1;
			var tmp2;
			var o1 = o.o;
			var tmp3;
			if(o1 == null) tmp2 = null; else if(o1.__properties__ && (tmp3 = o1.__properties__["get_" + "_append_ba"])) tmp2 = o1[tmp3](); else tmp2 = o1._append_ba;
			var a1 = tmp2;
			tmp = function(a2) {
				return f(a1,a2);
			};
			var a = Reflect.makeVarArgs(tmp);
			var _i = this.position;
			a(this);
			var len = this.position - _i;
			return len;
		} else {
			throw new js__$Boot_HaxeError("Error: " + Std.string(o) + " Cannot be written to a ByteArray");
			return -1;
		}
	}
	,readStruct: function(type) {
		var ocl = tannus_ds_CObj.create(type);
		if(Object.prototype.hasOwnProperty.call(ocl.o,"_from_ba")) {
			var tmp;
			var tmp1;
			var _e = ocl.o;
			tmp1 = function(func,args) {
				return func.apply(_e,args);
			};
			var f = tmp1;
			var tmp2;
			var o = ocl.o;
			var tmp3;
			if(o == null) tmp2 = null; else if(o.__properties__ && (tmp3 = o.__properties__["get_" + "_from_ba"])) tmp2 = o[tmp3](); else tmp2 = o._from_ba;
			var a1 = tmp2;
			tmp = function(a2) {
				return f(a1,a2);
			};
			var _from = Reflect.makeVarArgs(tmp);
			return _from(this);
		} else throw new js__$Boot_HaxeError("Error: " + tannus_internal_TypeTools.typename(type) + " has no \"_from_ba\" method");
	}
	,prepend: function(header,len) {
		if(len == null) header._length;
		this.shiftRight(header._length);
		this.position = 0;
		this.write(header);
		return this;
	}
	,prependString: function(head,len) {
		var tmp;
		var tmp1;
		var o = js_Boot.getClass(this);
		var tmp2;
		if(o == null) tmp1 = null; else if(o.__properties__ && (tmp2 = o.__properties__["get_" + "ofString"])) tmp1 = o[tmp2](); else tmp1 = o.ofString;
		var header = tmp1(head);
		var len1 = len;
		if(len1 == null) len1 = header._length;
		this.shiftRight(header._length);
		this.position = 0;
		this.write(header);
		tmp = this;
		return tmp;
	}
	,shiftRight: function(digits) {
		var lpad = this._alloc(digits);
		lpad.fill(0);
		lpad = lpad.concat(this);
		this.resize(this._length + digits);
		this;
		this.setData(lpad.b);
	}
	,shiftLeft: function(digits) {
		var rpad = this._alloc(digits);
		rpad.fill(0);
		var tmp;
		var this1 = this.slice(digits);
		tmp = this1.concat(rpad);
		var backward = tmp;
		this.resize(this._length + digits);
		this;
		this.setData(backward.b);
	}
	,sub: function(index,size) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,slice: function(min,max) {
		return this.sub(min,(max != null?max:this._length) - min);
	}
	,blit: function(index,src,srcIndex,size) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,resize: function(size) {
		this._length = size;
	}
	,reverse: function() {
		var _g1 = 0;
		var _g = Math.floor(this._length / 2);
		while(_g1 < _g) {
			var i = _g1++;
			var temp = this.get(i);
			this.set(i,this.get(this._length - i - 1));
			this.set(this._length - i - 1,temp);
		}
	}
	,grow: function(amount) {
		this.resize(this._length + amount);
		return this;
	}
	,concat: function(other) {
		throw new js__$Boot_HaxeError("Not implemented");
	}
	,copy: function() {
		return this;
	}
	,iterator: function() {
		return new tannus_io_impl_BinaryIterator(this);
	}
	,getString: function(index,len) {
		return "";
	}
	,getData: function() {
		return this.b;
	}
	,seek: function(i) {
		return this.position = i;
	}
	,toString: function() {
		return this.getString(0,this._length);
	}
	,toBytes: function() {
		return haxe_io_Bytes.alloc(0);
	}
	,toHex: function() {
		var sb_b = "";
		var chars = "0123456789ABCDEF".split("").map(function(s) {
			return HxOverrides.cca(s,0);
		});
		var _g1 = 0;
		var _g = this._length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.get(i);
			sb_b += String.fromCharCode(chars[c >> 4]);
			sb_b += String.fromCharCode(chars[c & 15]);
		}
		return sb_b;
	}
	,base64Encode: function() {
		return haxe_crypto_Base64.encode(this.toBytes());
	}
	,toBase64: function() {
		return this.base64Encode();
	}
	,toDataUrl: function(type) {
		if(type == null) type = "text/plain";
		var encoded = this.base64Encode();
		return "data:" + type + ";base64," + encoded;
	}
	,toArray: function() {
		var tmp;
		var _g = [];
		var $it0 = this.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			_g.push(c);
		}
		tmp = _g;
		return tmp;
	}
	,equals: function(other) {
		if(this._length != other._length) return false; else {
			var _g1 = 0;
			var _g = this._length;
			while(_g1 < _g) {
				var i = _g1++;
				if(this.get(i) != other.get(i)) return false;
			}
			return true;
		}
	}
	,setData: function(data) {
		this.b = data;
	}
	,err: function(e) {
		throw new js__$Boot_HaxeError(e);
	}
	,outOfBounds: function() {
		throw new js__$Boot_HaxeError(tannus_io_impl_BinaryError.OutOfBounds);
	}
	,overflow: function() {
		throw new js__$Boot_HaxeError(tannus_io_impl_BinaryError.Overflow);
	}
	,_alloc: function(size) {
		var allocf = (function($this) {
			var $r;
			var o = js_Boot.getClass($this);
			var tmp;
			$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + "alloc"])?o[tmp]():o.alloc;
			return $r;
		}(this));
		return allocf(size);
	}
	,_ofString: function(s) {
		return ((function($this) {
			var $r;
			var o = js_Boot.getClass($this);
			var tmp;
			$r = o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + "ofString"])?o[tmp]():o.ofString;
			return $r;
		}(this)))(s);
	}
	,get_length: function() {
		return this._length;
	}
	,get_empty: function() {
		return this._length <= 0;
	}
	,get_first: function() {
		return this.get(0);
	}
	,set_first: function(v) {
		return this.set(0,v);
	}
	,get_last: function() {
		return this.get(this._length - 1);
	}
	,set_last: function(v) {
		return this.set(this._length - 1,v);
	}
	,__class__: tannus_io_Binary
	,__properties__: {set_last:"set_last",get_last:"get_last",set_first:"set_first",get_first:"get_first",get_empty:"get_empty",get_length:"get_length"}
};
var tannus_io__$Byte_Byte_$Impl_$ = {};
$hxClasses["tannus.io._Byte.Byte_Impl_"] = tannus_io__$Byte_Byte_$Impl_$;
tannus_io__$Byte_Byte_$Impl_$.__name__ = ["tannus","io","_Byte","Byte_Impl_"];
tannus_io__$Byte_Byte_$Impl_$.__properties__ = {set_aschar:"set_aschar",get_aschar:"get_aschar",set_asint:"set_asint",get_asint:"get_asint",get_self:"get_self"}
tannus_io__$Byte_Byte_$Impl_$._new = function(n) {
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.get_self = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.get_asint = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.set_asint = function(this1,n) {
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	return n;
};
tannus_io__$Byte_Byte_$Impl_$.get_aschar = function(this1) {
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.set_aschar = function(this1,s) {
	var n = HxOverrides.cca(s,0);
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.isNumeric = function(this1) {
	return this1 >= 48 && this1 <= 57;
};
tannus_io__$Byte_Byte_$Impl_$.isLetter = function(this1) {
	return this1 >= 65 && this1 <= 90 || this1 >= 97 && this1 <= 122;
};
tannus_io__$Byte_Byte_$Impl_$.isAlphaNumeric = function(this1) {
	var tmp;
	if(!(this1 >= 48 && this1 <= 57)) {
		var tmp1;
		if(this1 >= 65) tmp1 = this1 <= 90; else tmp1 = false;
		if(!tmp1) {
			if(this1 >= 97) tmp = this1 <= 122; else tmp = false;
		} else tmp = true;
	} else tmp = true;
	return tmp;
};
tannus_io__$Byte_Byte_$Impl_$.isUppercase = function(this1) {
	return this1 >= 65 && this1 <= 90;
};
tannus_io__$Byte_Byte_$Impl_$.isLowercase = function(this1) {
	return this1 >= 97 && this1 <= 122;
};
tannus_io__$Byte_Byte_$Impl_$.isWhiteSpace = function(this1) {
	return Lambda.has([9,10,11,12,13,32],this1);
};
tannus_io__$Byte_Byte_$Impl_$.isLineBreaking = function(this1) {
	return this1 == 10 || this1 == 13;
};
tannus_io__$Byte_Byte_$Impl_$.isPunctuation = function(this1) {
	return Lambda.has([33,44,45,46,58,59,53],this1);
};
tannus_io__$Byte_Byte_$Impl_$.equalsi = function(this1,other) {
	return this1 == other;
};
tannus_io__$Byte_Byte_$Impl_$.equalss = function(this1,other) {
	return this1 == HxOverrides.cca(other,0);
};
tannus_io__$Byte_Byte_$Impl_$.repeat = function(this1,times) {
	return tannus_ds_StringUtils.times(String.fromCharCode(this1),times);
};
tannus_io__$Byte_Byte_$Impl_$.toString = function(this1) {
	return String.fromCharCode(this1);
};
tannus_io__$Byte_Byte_$Impl_$.toInt = function(this1) {
	return this1;
};
tannus_io__$Byte_Byte_$Impl_$.fromString = function(s) {
	var tmp;
	var n = HxOverrides.cca(s,0);
	var this1;
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
	this1 = n;
	tmp = this1;
	return tmp;
};
tannus_io__$Byte_Byte_$Impl_$.isValid = function(n) {
	return ((n | 0) === n) && isFinite(n) && !isNaN(n);
};
tannus_io__$Byte_Byte_$Impl_$.assertValid = function(n) {
	if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
};
var tannus_io__$ByteArray_ByteArray_$Impl_$ = {};
$hxClasses["tannus.io._ByteArray.ByteArray_Impl_"] = tannus_io__$ByteArray_ByteArray_$Impl_$;
tannus_io__$ByteArray_ByteArray_$Impl_$.__name__ = ["tannus","io","_ByteArray","ByteArray_Impl_"];
tannus_io__$ByteArray_ByteArray_$Impl_$._new = function(size) {
	if(size == null) size = 0;
	var this1;
	this1 = tannus_io_impl_BrowserBinary.alloc(size);
	return this1;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.get = function(this1,i) {
	return this1.get(i);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.set = function(this1,i,v) {
	return this1.set(i,v);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBytes = function(this1) {
	return this1.toBytes();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toBase = function(this1) {
	return this1.b;
};
tannus_io__$ByteArray_ByteArray_$Impl_$.toArray = function(this1) {
	return this1.toArray();
};
tannus_io__$ByteArray_ByteArray_$Impl_$.expandByString = function(this1,s) {
	return this1.appendString(s);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.expand = function(this1,other) {
	return this1.append(other);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.concat = function(this1,other) {
	return this1.concat(other);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.equals = function(this1,o) {
	return this1.equals(o);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.alloc = function(size) {
	return tannus_io_impl_BrowserBinary.alloc(size);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.ofData = function(d) {
	return tannus_io_impl_BrowserBinary.ofData(d);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.ofString = function(s) {
	return tannus_io_impl_BrowserBinary.ofString(s);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBytes = function(b) {
	return tannus_io_impl_BrowserBinary.fromBytes(b);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromBase64 = function(s) {
	return tannus_io_impl_BrowserBinary.fromBase64(s);
};
tannus_io__$ByteArray_ByteArray_$Impl_$.fromVector = function(vec) {
	var tmp;
	var this1;
	this1 = tannus_io_impl_BrowserBinary.alloc(vec.length);
	tmp = this1;
	var data = tmp;
	var _g1 = 0;
	var _g = vec.length;
	while(_g1 < _g) {
		var index = _g1++;
		data.set(index,vec[index]);
	}
	return data;
};
var tannus_io_ByteStack = function(data) {
	tannus_ds_Stack.call(this,[]);
	this.b = data;
	this.i = 0;
};
$hxClasses["tannus.io.ByteStack"] = tannus_io_ByteStack;
tannus_io_ByteStack.__name__ = ["tannus","io","ByteStack"];
tannus_io_ByteStack.__super__ = tannus_ds_Stack;
tannus_io_ByteStack.prototype = $extend(tannus_ds_Stack.prototype,{
	read: function(dis) {
		var tmp;
		var this1;
		this1 = tannus_io_impl_BrowserBinary.alloc(dis);
		tmp = this1;
		var data = tmp;
		var _g = 0;
		while(_g < dis) {
			_g++;
			var c = this.pop();
			data.set(data.position++,c);
		}
		return data;
	}
	,readUntil: function(delimiter) {
		var tmp;
		var this1;
		this1 = tannus_io_impl_BrowserBinary.alloc(0);
		tmp = this1;
		var res = tmp;
		while(this.peek() != delimiter) res.push(this.pop());
		return res;
	}
	,peekAhead: function(dis) {
		var tmp;
		var this1;
		this1 = tannus_io_impl_BrowserBinary.alloc(dis);
		tmp = this1;
		var data = tmp;
		var _g1 = 1;
		var _g = dis + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.peek(i);
			data.set(data.position++,c);
		}
		return data;
	}
	,copy: function() {
		var c = new tannus_io_ByteStack(this.b);
		c.i = this.i;
		return c;
	}
	,peek: function(dis) {
		if(dis == null) dis = 0;
		return this.b.get(this.i + dis);
	}
	,pop: function() {
		var tmp;
		var i = this.i++;
		tmp = this.b.get(i);
		return tmp;
	}
	,get_empty: function() {
		return this.i >= this.b._length;
	}
	,seek: function(pos) {
		this.i = pos;
	}
	,getByteArray: function() {
		return this.b.copy();
	}
	,remaining: function() {
		return this.b._length - this.i;
	}
	,__class__: tannus_io_ByteStack
});
var tannus_io_EventDispatcher = function() {
	this.__checkEvents = true;
	this._sigs = new haxe_ds_StringMap();
};
$hxClasses["tannus.io.EventDispatcher"] = tannus_io_EventDispatcher;
tannus_io_EventDispatcher.__name__ = ["tannus","io","EventDispatcher"];
tannus_io_EventDispatcher.prototype = {
	addSignal: function(name,sig) {
		var tmp;
		var alt = new tannus_io_Signal();
		if(sig != null) tmp = sig; else tmp = alt;
		var v = tmp;
		var _this = this._sigs;
		if(__map_reserved[name] != null) _this.setReserved(name,v); else _this.h[name] = v;
		v;
	}
	,addSignals: function(names) {
		var _g = 0;
		while(_g < names.length) {
			var name = names[_g];
			++_g;
			this.addSignal(name);
		}
	}
	,getSignal: function(name) {
		if(!this.canDispatch(name)) {
			if(this.__checkEvents) throw new js__$Boot_HaxeError("InvalidEvent: \"" + name + "\" is not a valid Event"); else {
				var v = new tannus_io_Signal();
				var _this = this._sigs;
				if(__map_reserved[name] != null) _this.setReserved(name,v); else _this.h[name] = v;
				v;
			}
		}
		var tmp;
		var _this1 = this._sigs;
		if(__map_reserved[name] != null) tmp = _this1.getReserved(name); else tmp = _this1.h[name];
		return tmp;
	}
	,canDispatch: function(name) {
		var tmp;
		var _this = this._sigs;
		if(__map_reserved[name] != null) tmp = _this.existsReserved(name); else tmp = _this.h.hasOwnProperty(name);
		return tmp;
	}
	,on: function(name,action,once) {
		var _this = this.getSignal(name);
		_this.listen(action,once);
	}
	,once: function(name,action) {
		this.on(name,action,true);
	}
	,dispatch: function(name,data) {
		var _this = this.getSignal(name);
		_this.broadcast(data);
	}
	,off: function(name,action) {
		var sig = this.getSignal(name);
		if(action != null) sig.ignore(action); else sig.handlers = [];
	}
	,when: function(name,test,action) {
		this.getSignal(name).when(test,action);
	}
	,__class__: tannus_io_EventDispatcher
};
var tannus_io__$Getter_Getter_$Impl_$ = {};
$hxClasses["tannus.io._Getter.Getter_Impl_"] = tannus_io__$Getter_Getter_$Impl_$;
tannus_io__$Getter_Getter_$Impl_$.__name__ = ["tannus","io","_Getter","Getter_Impl_"];
tannus_io__$Getter_Getter_$Impl_$.__properties__ = {get_v:"get_v"}
tannus_io__$Getter_Getter_$Impl_$._new = function(f) {
	return f;
};
tannus_io__$Getter_Getter_$Impl_$.get_v = function(this1) {
	return this1();
};
tannus_io__$Getter_Getter_$Impl_$.get = function(this1) {
	return this1();
};
tannus_io__$Getter_Getter_$Impl_$.toString = function(this1) {
	return Std.string(this1());
};
tannus_io__$Getter_Getter_$Impl_$.transform = function(this1,f) {
	var trans_get = function() {
		return f(this1());
	};
	return trans_get;
};
tannus_io__$Getter_Getter_$Impl_$.addNumber = function(get,val) {
	return get() + val;
};
tannus_io__$Getter_Getter_$Impl_$.addString = function(get,val) {
	return get() + val;
};
var tannus_io__$Pointer_Pointer_$Impl_$ = {};
$hxClasses["tannus.io._Pointer.Pointer_Impl_"] = tannus_io__$Pointer_Pointer_$Impl_$;
tannus_io__$Pointer_Pointer_$Impl_$.__name__ = ["tannus","io","_Pointer","Pointer_Impl_"];
tannus_io__$Pointer_Pointer_$Impl_$.__properties__ = {set_deleter:"set_deleter",get_deleter:"get_deleter",get_set:"get_set",get_get:"get_get",get_exists:"get_exists",set__:"set__",get__:"get__",set_setter:"set_setter",get_setter:"get_setter",set_getter:"set_getter",get_getter:"get_getter",set_v:"set_v",get_v:"get_v",set_value:"set_value",get_value:"get_value",get_self:"get_self"}
tannus_io__$Pointer_Pointer_$Impl_$._new = function(g,s,d) {
	return new tannus_io__$Pointer_Ref(g,s);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_self = function(this1) {
	return this1;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_value = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set_value = function(this1,nv) {
	return this1.set(nv);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_v = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set_v = function(this1,nv) {
	return this1.set(nv);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_getter = function(this1) {
	return this1.getter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_getter = function(this1,ng) {
	return this1.getter = ng;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_setter = function(this1) {
	return this1.setter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_setter = function(this1,ns) {
	return this1.setter = ns;
};
tannus_io__$Pointer_Pointer_$Impl_$.get__ = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.set__ = function(this1,v) {
	return this1.set(v);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_exists = function(this1) {
	return this1.get() != null;
};
tannus_io__$Pointer_Pointer_$Impl_$.get_get = function(this1) {
	return $bind(this1,this1.get);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_set = function(this1) {
	return $bind(this1,this1.set);
};
tannus_io__$Pointer_Pointer_$Impl_$.get_deleter = function(this1) {
	return this1.deleter;
};
tannus_io__$Pointer_Pointer_$Impl_$.set_deleter = function(this1,nd) {
	return this1.deleter = nd;
};
tannus_io__$Pointer_Pointer_$Impl_$["delete"] = function(this1) {
	this1["delete"]();
};
tannus_io__$Pointer_Pointer_$Impl_$.to_underlying = function(this1) {
	return this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.setvalue = function(this1,v) {
	return this1.set(v);
};
tannus_io__$Pointer_Pointer_$Impl_$.setPointer = function(this1,v) {
	return this1.set(v.get());
};
tannus_io__$Pointer_Pointer_$Impl_$.access = function(this1,v) {
	return v != null?this1.set(v):this1.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.attach_str = function(this1,str) {
	var s = this1.setter;
	this1.setter = tannus_io__$Setter_Setter_$Impl_$.attach(s,str);
};
tannus_io__$Pointer_Pointer_$Impl_$._transform = function(this1,mget,mset) {
	var tmp;
	var g = tannus_io__$Getter_Getter_$Impl_$.transform(this1.getter,mget);
	var s = tannus_io__$Setter_Setter_$Impl_$.transform(this1.setter,mset);
	tmp = new tannus_io__$Pointer_Ref(g,s);
	return tmp;
};
tannus_io__$Pointer_Pointer_$Impl_$.clone = function(this1) {
	return new tannus_io__$Pointer_Ref(this1.getter,this1.setter);
};
tannus_io__$Pointer_Pointer_$Impl_$.toGetter = function(this1) {
	return this1.getter;
};
tannus_io__$Pointer_Pointer_$Impl_$.toSetter = function(this1) {
	return this1.setter;
};
tannus_io__$Pointer_Pointer_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_io__$Pointer_Pointer_$Impl_$.iterator = function(self) {
	return $iterator(self.get())();
};
tannus_io__$Pointer_Pointer_$Impl_$.pre_decrement = function(a) {
	a.set(a.get() - 1);
	return a.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.pre_increment = function(a) {
	a.set(a.get() + 1);
	return a.get();
};
tannus_io__$Pointer_Pointer_$Impl_$.post_decrement = function(a) {
	var r = a.get();
	a.set(r - 1);
	return r;
};
tannus_io__$Pointer_Pointer_$Impl_$.post_increment = function(a) {
	var r = a.get();
	a.set(r + 1);
	return r;
};
tannus_io__$Pointer_Pointer_$Impl_$.fromAccessor = function(af) {
	var tmp;
	var f = af;
	tmp = function() {
		return f(null);
	};
	var tmp1;
	var f1 = af;
	tmp1 = function(a1) {
		return f1(a1);
	};
	return new tannus_io__$Pointer_Ref(tmp,tmp1);
};
var tannus_io__$Pointer_Ref = function(g,s,d) {
	var _g = this;
	this.getter = g;
	this.setter = s;
	this.deleter = d;
	var prop = function(n) {
		var tmp;
		var tmp2;
		if(_g == null) tmp = null; else if(_g.__properties__ && (tmp2 = _g.__properties__["get_" + "__defineGetter__"])) tmp = _g[tmp2](); else tmp = _g.__defineGetter__;
		tmp.call(_g,n,$bind(_g,_g.get));
		var tmp1;
		var tmp3;
		if(_g == null) tmp1 = null; else if(_g.__properties__ && (tmp3 = _g.__properties__["get_" + "__defineSetter__"])) tmp1 = _g[tmp3](); else tmp1 = _g.__defineSetter__;
		tmp1.call(_g,n,$bind(_g,_g.set));
	};
	var _g1 = 0;
	var _g11 = ["value","v","_"];
	while(_g1 < _g11.length) {
		var n1 = _g11[_g1];
		++_g1;
		prop(n1);
	}
};
$hxClasses["tannus.io._Pointer.Ref"] = tannus_io__$Pointer_Ref;
tannus_io__$Pointer_Ref.__name__ = ["tannus","io","_Pointer","Ref"];
tannus_io__$Pointer_Ref.prototype = {
	get: function() {
		return this.getter();
	}
	,set: function(v) {
		return this.setter(v);
	}
	,'delete': function() {
		if(this.deleter != null) this.deleter();
	}
	,toString: function() {
		return Std.string(this.get());
	}
	,__class__: tannus_io__$Pointer_Ref
};
var tannus_io__$RegEx_RegEx_$Impl_$ = {};
$hxClasses["tannus.io._RegEx.RegEx_Impl_"] = tannus_io__$RegEx_RegEx_$Impl_$;
tannus_io__$RegEx_RegEx_$Impl_$.__name__ = ["tannus","io","_RegEx","RegEx_Impl_"];
tannus_io__$RegEx_RegEx_$Impl_$._new = function(pattern) {
	return pattern;
};
tannus_io__$RegEx_RegEx_$Impl_$.matches = function(this1,text) {
	var ma = [];
	this1.map(text,function(e) {
		var parts = [];
		var i = 0;
		var matched = true;
		while(matched) try {
			var p = e.matched(i);
			if(p == null) {
				matched = false;
				break;
			}
			parts.push(p);
			i++;
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			matched = false;
			break;
		}
		ma.push(parts);
		return "";
	});
	return ma;
};
tannus_io__$RegEx_RegEx_$Impl_$.search = function(this1,s) {
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,s);
};
tannus_io__$RegEx_RegEx_$Impl_$.extract = function(this1,str,n) {
	if(n == null) n = 0;
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,str)[n];
};
tannus_io__$RegEx_RegEx_$Impl_$.extractGroups = function(this1,str,n) {
	if(n == null) n = 0;
	return tannus_io__$RegEx_RegEx_$Impl_$.matches(this1,str)[0].slice(1);
};
tannus_io__$RegEx_RegEx_$Impl_$.findAll = function(this1,s) {
	var all = [];
	this1.map(s,function(e) {
		e.matchedPos();
		all.push({ 'str' : s, 'pos' : e.matchedPos()});
		return s;
	});
	return all;
};
tannus_io__$RegEx_RegEx_$Impl_$.replace = function(this1,rtext,text) {
	return this1.map(rtext,function(e) {
		var i = 0;
		var whole = null;
		var subs = [];
		while(true) try {
			var s = this1.matched(i++);
			if(whole == null) whole = s; else subs.push(s);
		} catch( err ) {
			if (err instanceof js__$Boot_HaxeError) err = err.val;
			break;
		}
		var _t = text;
		var _g1 = 0;
		var _g = subs.length;
		while(_g1 < _g) {
			var ii = _g1++;
			_t = StringTools.replace(_t,"{{" + ii + "}}",subs[ii]);
		}
		return _t;
	});
};
tannus_io__$RegEx_RegEx_$Impl_$.toTester = function(this1) {
	var tmp;
	var f = $bind(this1,this1.match);
	tmp = function(s) {
		return f(s);
	};
	return tmp;
};
var tannus_io__$Setter_Setter_$Impl_$ = {};
$hxClasses["tannus.io._Setter.Setter_Impl_"] = tannus_io__$Setter_Setter_$Impl_$;
tannus_io__$Setter_Setter_$Impl_$.__name__ = ["tannus","io","_Setter","Setter_Impl_"];
tannus_io__$Setter_Setter_$Impl_$.__properties__ = {set_v:"set_v"}
tannus_io__$Setter_Setter_$Impl_$._new = function(f) {
	return f;
};
tannus_io__$Setter_Setter_$Impl_$.set_v = function(this1,nv) {
	return this1(nv);
};
tannus_io__$Setter_Setter_$Impl_$.wrap = function(this1,f) {
	var self = this1;
	(function(v) {
		return f(self,v);
	});
};
tannus_io__$Setter_Setter_$Impl_$.attach = function(this1,other) {
	var f = function(s,val) {
		other(val);
		return s(val);
	};
	var self = this1;
	this1 = function(v) {
		return f(self,v);
	};
	return this1;
};
tannus_io__$Setter_Setter_$Impl_$.transform = function(this1,f) {
	return function(o) {
		var v = f(o);
		this1(v);
		return o;
	};
};
tannus_io__$Setter_Setter_$Impl_$.set = function(this1,v) {
	return this1(v);
};
var tannus_io_Signal = function() {
	this.handlers = [];
	this.ondelete = function() {
	};
};
$hxClasses["tannus.io.Signal"] = tannus_io_Signal;
tannus_io_Signal.__name__ = ["tannus","io","Signal"];
tannus_io_Signal.prototype = {
	add: function(handler) {
		this.handlers.push(handler);
	}
	,listen: function(f,once) {
		if(once == null) once = false;
		if(!once) {
			var handler = tannus_io__$Signal_Handler.Normal(f);
			this.handlers.push(handler);
		} else {
			var _fired = false;
			var fired = new tannus_io__$Pointer_Ref(function() {
				return _fired;
			},function(v) {
				return _fired = v;
			});
			var handler1 = tannus_io__$Signal_Handler.Once(f,fired);
			this.handlers.push(handler1);
		}
	}
	,on: function(f,once) {
		if(once == null) once = false;
		this.listen(f,once);
	}
	,once: function(f) {
		this.listen(f,true);
	}
	,when: function(test,f) {
		var handler = tannus_io__$Signal_Handler.Tested(f,test);
		this.handlers.push(handler);
	}
	,times: function(count,f) {
		var _fired = 0;
		var fired = new tannus_io__$Pointer_Ref(function() {
			return _fired;
		},function(v) {
			return _fired = v;
		});
		var handler = tannus_io__$Signal_Handler.Counted(f,count,fired);
		this.handlers.push(handler);
	}
	,every: function(wait,f) {
		var _rem = 0;
		var rem = new tannus_io__$Pointer_Ref(function() {
			return _rem;
		},function(v) {
			return _rem = v;
		});
		var handler = tannus_io__$Signal_Handler.Every(f,wait,rem);
		this.handlers.push(handler);
	}
	,ignore: function(func) {
		this.handlers = this.handlers.filter(function(h) {
			switch(h[1]) {
			case 0:
				var f = h[2];
				return !Reflect.compareMethods(f,func);
			case 3:
				var f1 = h[2];
				return !Reflect.compareMethods(f1,func);
			case 4:
				var f2 = h[2];
				return !Reflect.compareMethods(f2,func);
			case 1:
				var f3 = h[2];
				return !Reflect.compareMethods(f3,func);
			case 2:
				var f4 = h[2];
				return !Reflect.compareMethods(f4,func);
			}
		});
	}
	,off: function(f) {
		this.ignore(f);
	}
	,clear: function() {
		this.handlers = [];
	}
	,callHandler: function(h,arg) {
		switch(h[1]) {
		case 0:
			h[2](arg);
			break;
		case 3:
			var fired = h[3];
			if(!fired.get()) {
				h[2](arg);
				fired.set(true);
			}
			break;
		case 4:
			if(h[3](arg)) h[2](arg);
			break;
		case 1:
			var called = h[4];
			if(called.get() <= h[3]) {
				h[2](arg);
				var v = called.get() + 1;
				called.set(v);
			}
			break;
		case 2:
			var rem = h[4];
			if(rem.get() == h[3]) {
				h[2](arg);
				rem.set(0);
			} else {
				var nv = rem.get() + 1;
				rem.set(nv);
			}
			break;
		}
	}
	,broadcast: function(data) {
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			this.callHandler(h,data);
		}
	}
	,call: function(data) {
		this.broadcast(data);
	}
	,__class__: tannus_io_Signal
};
var tannus_io__$Signal_Handler = $hxClasses["tannus.io._Signal.Handler"] = { __ename__ : ["tannus","io","_Signal","Handler"], __constructs__ : ["Normal","Counted","Every","Once","Tested"] };
tannus_io__$Signal_Handler.Normal = function(func) { var $x = ["Normal",0,func]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Counted = function(func,count,fired) { var $x = ["Counted",1,func,count,fired]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Every = function(func,wait,remaining) { var $x = ["Every",2,func,wait,remaining]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Once = function(func,fired) { var $x = ["Once",3,func,fired]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
tannus_io__$Signal_Handler.Tested = function(func,test) { var $x = ["Tested",4,func,test]; $x.__enum__ = tannus_io__$Signal_Handler; $x.toString = $estr; return $x; };
var tannus_io_VoidSignal = function() {
	this.handlers = [];
	this.ondelete = function() {
	};
	this._remove = [];
};
$hxClasses["tannus.io.VoidSignal"] = tannus_io_VoidSignal;
tannus_io_VoidSignal.__name__ = ["tannus","io","VoidSignal"];
tannus_io_VoidSignal.prototype = {
	clone: function() {
		var c = new tannus_io_VoidSignal();
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			switch(h[1]) {
			case 0:
				var tmp;
				var f = [h[2]];
				tmp = (function(f) {
					return function() {
						f[0]();
					};
				})(f);
				var h1 = tannus_io__$VoidSignal_Handler.Normal(tmp);
				c.handlers.push(h1);
				break;
			case 1:
				var tmp1;
				var f1 = [h[2]];
				tmp1 = (function(f1) {
					return function() {
						f1[0]();
					};
				})(f1);
				var tmp2;
				var tmp3;
				var _v = [h[4]];
				tmp3 = new tannus_io__$Pointer_Ref((function(_v) {
					return function() {
						return _v[0];
					};
				})(_v),(function(_v) {
					return function(v) {
						return _v[0] = v;
					};
				})(_v));
				var this1 = tmp3;
				tmp2 = this1.get();
				var h2 = tannus_io__$VoidSignal_Handler.Counted(tmp1,h[3],tmp2);
				c.handlers.push(h2);
				break;
			case 3:
				if(!h[3].get()) {
					var tmp4;
					var f2 = [h[2]];
					tmp4 = (function(f2) {
						return function() {
							f2[0]();
						};
					})(f2);
					var tmp5;
					var _v1 = [false];
					tmp5 = new tannus_io__$Pointer_Ref((function(_v1) {
						return function() {
							return _v1[0];
						};
					})(_v1),(function(_v1) {
						return function(v1) {
							return _v1[0] = v1;
						};
					})(_v1));
					var h3 = tannus_io__$VoidSignal_Handler.Once(tmp4,tmp5);
					c.handlers.push(h3);
				}
				break;
			case 2:
				var tmp6;
				var f3 = [h[2]];
				tmp6 = (function(f3) {
					return function() {
						f3[0]();
					};
				})(f3);
				var tmp7;
				var tmp8;
				var _v2 = [h[4]];
				tmp8 = new tannus_io__$Pointer_Ref((function(_v2) {
					return function() {
						return _v2[0];
					};
				})(_v2),(function(_v2) {
					return function(v2) {
						return _v2[0] = v2;
					};
				})(_v2));
				var this2 = tmp8;
				tmp7 = this2.get();
				var h4 = tannus_io__$VoidSignal_Handler.Every(tmp6,h[3],tmp7);
				c.handlers.push(h4);
				break;
			}
		}
		return c;
	}
	,add: function(h) {
		this.handlers.push(h);
	}
	,on: function(f) {
		var h = tannus_io__$VoidSignal_Handler.Normal(f);
		this.handlers.push(h);
	}
	,once: function(f) {
		var tmp;
		var _v = false;
		tmp = new tannus_io__$Pointer_Ref(function() {
			return _v;
		},function(v) {
			return _v = v;
		});
		var h = tannus_io__$VoidSignal_Handler.Once(f,tmp);
		this.handlers.push(h);
	}
	,times: function(count,f) {
		var tmp;
		var _v = 0;
		tmp = new tannus_io__$Pointer_Ref(function() {
			return _v;
		},function(v) {
			return _v = v;
		});
		var h = tannus_io__$VoidSignal_Handler.Counted(f,count,tmp);
		this.handlers.push(h);
	}
	,every: function(interval,f) {
		var tmp;
		var _v = interval;
		tmp = new tannus_io__$Pointer_Ref(function() {
			return _v;
		},function(v) {
			return _v = v;
		});
		var h = tannus_io__$VoidSignal_Handler.Every(f,interval,tmp);
		this.handlers.push(h);
	}
	,ignore: function(func) {
		var ignores = [];
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			switch(h[1]) {
			case 0:
				if(Reflect.compareMethods(h[2],func)) ignores.push(h);
				break;
			case 3:
				if(Reflect.compareMethods(h[2],func)) ignores.push(h);
				break;
			case 1:
				if(Reflect.compareMethods(h[2],func)) ignores.push(h);
				break;
			case 2:
				if(Reflect.compareMethods(h[2],func)) ignores.push(h);
				break;
			}
		}
		var _g2 = 0;
		while(_g2 < ignores.length) {
			var h1 = ignores[_g2];
			++_g2;
			HxOverrides.remove(this.handlers,h1);
		}
	}
	,off: function(f) {
		this.ignore(f);
	}
	,clear: function() {
		this.handlers = [];
	}
	,callHandler: function(h) {
		switch(h[1]) {
		case 0:
			h[2]();
			break;
		case 3:
			if(!h[3].get()) {
				h[2]();
				this._remove.push(h);
			}
			break;
		case 1:
			var fired = h[4];
			if(fired.get() < h[3]) {
				h[2]();
				var nv = fired.get() + 1;
				fired.set(nv);
			} else this._remove.push(h);
			break;
		case 2:
			var rem = h[4];
			if(rem.get() == h[3]) {
				h[2]();
				rem.set(0);
			} else {
				var nv1 = rem.get() + 1;
				rem.set(nv1);
			}
			break;
		}
	}
	,call: function() {
		var _g = 0;
		var _g1 = this.handlers;
		while(_g < _g1.length) {
			var h = _g1[_g];
			++_g;
			this.callHandler(h);
		}
		var _g2 = 0;
		var _g11 = this._remove;
		while(_g2 < _g11.length) {
			var h1 = _g11[_g2];
			++_g2;
			HxOverrides.remove(this.handlers,h1);
		}
		this._remove = [];
	}
	,fire: function() {
		this.call();
	}
	,__class__: tannus_io_VoidSignal
};
var tannus_io__$VoidSignal_Handler = $hxClasses["tannus.io._VoidSignal.Handler"] = { __ename__ : ["tannus","io","_VoidSignal","Handler"], __constructs__ : ["Normal","Counted","Every","Once"] };
tannus_io__$VoidSignal_Handler.Normal = function(func) { var $x = ["Normal",0,func]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Counted = function(func,count,fired) { var $x = ["Counted",1,func,count,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Every = function(func,wait,remaining) { var $x = ["Every",2,func,wait,remaining]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
tannus_io__$VoidSignal_Handler.Once = function(func,fired) { var $x = ["Once",3,func,fired]; $x.__enum__ = tannus_io__$VoidSignal_Handler; $x.toString = $estr; return $x; };
var tannus_io_impl_BinaryError = $hxClasses["tannus.io.impl.BinaryError"] = { __ename__ : ["tannus","io","impl","BinaryError"], __constructs__ : ["Overflow","OutOfBounds","Custom"] };
tannus_io_impl_BinaryError.Overflow = ["Overflow",0];
tannus_io_impl_BinaryError.Overflow.toString = $estr;
tannus_io_impl_BinaryError.Overflow.__enum__ = tannus_io_impl_BinaryError;
tannus_io_impl_BinaryError.OutOfBounds = ["OutOfBounds",1];
tannus_io_impl_BinaryError.OutOfBounds.toString = $estr;
tannus_io_impl_BinaryError.OutOfBounds.__enum__ = tannus_io_impl_BinaryError;
tannus_io_impl_BinaryError.Custom = function(error) { var $x = ["Custom",2,error]; $x.__enum__ = tannus_io_impl_BinaryError; $x.toString = $estr; return $x; };
var tannus_io_impl_BinaryIterator = function(b) {
	this.bin = b;
	this.index = 0;
};
$hxClasses["tannus.io.impl.BinaryIterator"] = tannus_io_impl_BinaryIterator;
tannus_io_impl_BinaryIterator.__name__ = ["tannus","io","impl","BinaryIterator"];
tannus_io_impl_BinaryIterator.prototype = {
	hasNext: function() {
		return this.index <= this.bin._length - 1;
	}
	,next: function() {
		var c = this.bin.get(this.index);
		this.index++;
		return c;
	}
	,__class__: tannus_io_impl_BinaryIterator
};
var tannus_io_impl_BrowserBinary = $hx_exports.Binary = function(size,data,arr) {
	tannus_io_Binary.call(this,size,data);
	this.array = arr != null?arr:new Uint8Array(data);
};
$hxClasses["tannus.io.impl.BrowserBinary"] = tannus_io_impl_BrowserBinary;
tannus_io_impl_BrowserBinary.__name__ = ["tannus","io","impl","BrowserBinary"];
tannus_io_impl_BrowserBinary.alloc = function(size) {
	var list = new Uint8Array(size);
	var data = list.buffer;
	return new tannus_io_impl_BrowserBinary(size,data,list);
};
tannus_io_impl_BrowserBinary.ofData = function(d) {
	return new tannus_io_impl_BrowserBinary(d.byteLength,d);
};
tannus_io_impl_BrowserBinary.ofString = function(s) {
	if(s == "") return tannus_io_impl_BrowserBinary.alloc(0);
	var a = [];
	var i = 0;
	while(i < s.length) {
		var tmp;
		var index = i++;
		tmp = s.charCodeAt(index);
		var c = tmp;
		if(55296 <= c && c <= 56319) {
			var tmp1;
			var index1 = i++;
			tmp1 = s.charCodeAt(index1);
			c = c - 55232 << 10 | tmp1 & 1023;
		}
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	var tarr = new Uint8Array(a);
	return new tannus_io_impl_BrowserBinary(a.length,tarr.buffer);
};
tannus_io_impl_BrowserBinary.fromBuffer = function(b) {
	var jsb = tannus_io_impl_BrowserBinary.alloc(b.length);
	var _g1 = 0;
	var _g = b.length;
	while(_g1 < _g) {
		var i = _g1++;
		jsb.set(i,b[i]);
	}
	return jsb;
};
tannus_io_impl_BrowserBinary.fromBytes = function(b) {
	return tannus_io_impl_BrowserBinary.ofData(b.b.buffer);
};
tannus_io_impl_BrowserBinary.list = function(uia) {
	return Array.prototype.slice.call(uia,0);
};
tannus_io_impl_BrowserBinary.fromBase64 = function(s) {
	return tannus_io_impl_BrowserBinary.fromBytes(haxe_crypto_Base64.decode(s));
};
tannus_io_impl_BrowserBinary.__super__ = tannus_io_Binary;
tannus_io_impl_BrowserBinary.prototype = $extend(tannus_io_Binary.prototype,{
	idat: function() {
		if(this.data == null) this.data = new DataView(this.array.buffer,this.array.byteOffset,this.array.byteLength);
	}
	,get: function(i) {
		tannus_io_Binary.prototype.get.call(this,i);
		return this.array[i];
	}
	,set: function(i,v) {
		tannus_io_Binary.prototype.set.call(this,i,v);
		return this.array[i] = v;
	}
	,sub: function(index,size) {
		return new tannus_io_impl_BrowserBinary(size,this.b.slice(index,index + size));
	}
	,slice: function(start,end) {
		if(end == null) end = this._length;
		return new tannus_io_impl_BrowserBinary(end - start,this.b.slice(start,end));
	}
	,blit: function(index,src,srcIndex,size) {
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			this.set(index + i,src.get(srcIndex + i));
		}
	}
	,getString: function(index,size) {
		var result = "";
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			var tmp;
			var this1 = this.get(index + i);
			tmp = String.fromCharCode(this1);
			result += tmp;
		}
		return result;
	}
	,resize: function(size) {
		if(size < this._length) this.setData(this.b = this.b.slice(0,size)); else {
			var bigger = tannus_io_impl_BrowserBinary.alloc(size);
			bigger.blit(0,this,0,this._length);
			this.setData(bigger.b);
		}
	}
	,concat: function(other) {
		var lensum = this._length + other._length;
		var sum = new tannus_io_impl_BrowserBinary(lensum,new ArrayBuffer(lensum));
		sum.blit(0,this,0,this._length);
		sum.blit(this._length,other,0,other._length);
		return sum;
	}
	,setData: function(d) {
		this.b = d;
		this.array = new Uint8Array(this.b);
		this._length = this.array.length;
	}
	,toBytes: function() {
		return haxe_io_Bytes.ofData(this.b);
	}
	,toBuffer: function() {
		return new Buffer(this.array);
	}
	,__class__: tannus_io_impl_BrowserBinary
});
var tannus_macro_MacroTools = function() { };
$hxClasses["tannus.macro.MacroTools"] = tannus_macro_MacroTools;
tannus_macro_MacroTools.__name__ = ["tannus","macro","MacroTools"];
tannus_macro_MacroTools.toTypePath = function(s) {
	var path = { name : "", pack : [], params : null, sub : null};
	var bits = s.split(".");
	var _g = 0;
	while(_g < bits.length) {
		var b = bits[_g];
		++_g;
		if(b.toLowerCase() == b) path.pack.push(b); else if(b.charAt(0).toUpperCase() == b.charAt(0)) {
			if(path.name == "") path.name = b; else path.sub = b;
		}
	}
	return path;
};
var tannus_math__$Percent_Percent_$Impl_$ = {};
$hxClasses["tannus.math._Percent.Percent_Impl_"] = tannus_math__$Percent_Percent_$Impl_$;
tannus_math__$Percent_Percent_$Impl_$.__name__ = ["tannus","math","_Percent","Percent_Impl_"];
tannus_math__$Percent_Percent_$Impl_$.__properties__ = {set_delta:"set_delta",get_delta:"get_delta",set_value:"set_value",get_value:"get_value"}
tannus_math__$Percent_Percent_$Impl_$._new = function(f) {
	return f;
};
tannus_math__$Percent_Percent_$Impl_$.get_value = function(this1) {
	return this1;
};
tannus_math__$Percent_Percent_$Impl_$.set_value = function(this1,nv) {
	return nv;
};
tannus_math__$Percent_Percent_$Impl_$.get_delta = function(this1) {
	return this1 / 100;
};
tannus_math__$Percent_Percent_$Impl_$.set_delta = function(this1,v) {
	return v * 100;
};
tannus_math__$Percent_Percent_$Impl_$.toDelta = function(this1) {
	return this1 / 100;
};
tannus_math__$Percent_Percent_$Impl_$.complement = function(this1) {
	return 100 - this1;
};
tannus_math__$Percent_Percent_$Impl_$.plus = function(this1,other) {
	return this1 + other;
};
tannus_math__$Percent_Percent_$Impl_$.minus = function(this1,other) {
	return this1 - other;
};
tannus_math__$Percent_Percent_$Impl_$.preincrement = function(this1) {
	return ++this1;
};
tannus_math__$Percent_Percent_$Impl_$.postincrement = function(this1) {
	return this1++;
};
tannus_math__$Percent_Percent_$Impl_$.decrement = function(this1) {
	return --this1;
};
tannus_math__$Percent_Percent_$Impl_$.percent = function(what,of) {
	return what / of * 100;
};
tannus_math__$Percent_Percent_$Impl_$.toString = function(this1) {
	return "" + this1 + "%";
};
var tannus_math_Random = $hx_exports.Random = function(seed) {
	this.state = seed != null?seed:Math.floor(Math.random() * 2147483647);
};
$hxClasses["tannus.math.Random"] = tannus_math_Random;
tannus_math_Random.__name__ = ["tannus","math","Random"];
tannus_math_Random.stringSeed = function(seed) {
	var ba = tannus_io_impl_BrowserBinary.ofString(seed);
	var $it0 = ba.iterator();
	while( $it0.hasNext() ) {
		var bit = $it0.next();
		seed += bit;
	}
	return new tannus_math_Random(0);
};
tannus_math_Random.prototype = {
	nextInt: function() {
		this.state = (1103515245.0 * this.state + 12345) % 2147483647;
		return this.state;
	}
	,nextFloat: function() {
		return this.nextInt() / 2147483647;
	}
	,reset: function(value) {
		this.state = value;
	}
	,randint: function(min,max) {
		return Math.floor(this.nextFloat() * (max - min + 1) + min);
	}
	,chance: function(chances,choices,shuffleAll) {
		if(shuffleAll == null) shuffleAll = true;
		if(tannus_math_TMath.sum_Int(chances) != 100) throw new js__$Boot_HaxeError(new tannus_utils_JavaScriptError("RandomError: The [chances] parameter for tannus.math.Random::chance must add up to 100")); else if(chances.length != choices.length) throw new js__$Boot_HaxeError(new tannus_utils_JavaScriptError("RandomError: The [chances] and [choices] parameters for tannus.math.Random::chance must be of the same length")); else {
			var all = [];
			var _g1 = 0;
			var _g = chances.length;
			while(_g1 < _g) {
				var index = _g1++;
				var count = chances[index];
				var value = choices[index];
				var _g2 = 0;
				while(_g2 < count) {
					_g2++;
					all.push(value);
				}
			}
			if(shuffleAll) all = this.shuffle(all);
			return this.choice(all);
		}
	}
	,randchance: function(top,bottom) {
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < bottom) {
			var i = _g1++;
			_g.push(i);
		}
		tmp = _g;
		var choices = tmp;
		var correct = [];
		while(correct.length < top) {
			var cnum = this.choice(choices);
			if(!Lambda.has(correct,cnum)) correct.push(cnum);
		}
		return Lambda.has(correct,this.randint(top,bottom));
	}
	,randbool: function() {
		return this.randint(0,1) == 1;
	}
	,choice: function(set) {
		return set[this.randint(0,set.length - 1)];
	}
	,sample: function(set,size) {
		var sampleSize = size == null?this.randint(0,set.length):size;
		var items = [];
		while(items.length < sampleSize) {
			var ritem = this.choice(set);
			if(!Lambda.has(items,ritem)) items.push(ritem);
		}
		return items;
	}
	,shuffle: function(set) {
		var copy = set.slice();
		var result = [];
		if(copy.length > 0) {
			while(copy.length != 1) {
				var el = this.choice(copy);
				HxOverrides.remove(copy,el);
				result.push(el);
			}
			result.push(copy.pop());
		}
		return result;
	}
	,enumConstruct: function(_enum) {
		var name = this.choice(Type.getEnumConstructs(_enum));
		var tmp;
		var e = _enum;
		var a1 = name;
		tmp = function(a2) {
			return Type.createEnum(e,a1,a2);
		};
		return tmp;
	}
	,pointInRect: function(rect) {
		var tmp;
		var x = this.randint(Math.floor(rect.x),Math.floor(rect.x + rect.width));
		var y = this.randint(Math.floor(rect.y),Math.floor(rect.y + rect.height));
		tmp = new tannus_geom_TPoint(x,y,0);
		return tmp;
	}
	,__class__: tannus_math_Random
};
var tannus_math__$Ratio_Ratio_$Impl_$ = {};
$hxClasses["tannus.math._Ratio.Ratio_Impl_"] = tannus_math__$Ratio_Ratio_$Impl_$;
tannus_math__$Ratio_Ratio_$Impl_$.__name__ = ["tannus","math","_Ratio","Ratio_Impl_"];
tannus_math__$Ratio_Ratio_$Impl_$._new = function(top,bottom) {
	return new tannus_math_CRatio(top,bottom);
};
tannus_math__$Ratio_Ratio_$Impl_$.equals = function(this1,other) {
	return this1.equals(other);
};
tannus_math__$Ratio_Ratio_$Impl_$.toFloat = function(this1) {
	return this1.toFloat();
};
tannus_math__$Ratio_Ratio_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_math__$Ratio_Ratio_$Impl_$.toPercent = function(this1) {
	return this1.toPercent();
};
tannus_math__$Ratio_Ratio_$Impl_$.fromFloatArray = function(a) {
	return new tannus_math_CRatio(a[0],a[1]);
};
tannus_math__$Ratio_Ratio_$Impl_$.fromIntArray = function(a) {
	return new tannus_math_CRatio(a[0],a[1]);
};
var tannus_math_CRatio = function(t,b) {
	this.top = t;
	this.bottom = b;
};
$hxClasses["tannus.math.CRatio"] = tannus_math_CRatio;
tannus_math_CRatio.__name__ = ["tannus","math","CRatio"];
tannus_math_CRatio.prototype = {
	bottomValue: function(topValue) {
		return topValue / this.top * this.bottom;
	}
	,topValue: function(bottomValue) {
		return bottomValue / this.bottom * this.top;
	}
	,toFloat: function() {
		return this.top / this.bottom;
	}
	,toString: function() {
		return "" + this.top + " / " + this.bottom;
	}
	,toPercent: function() {
		return tannus_math__$Percent_Percent_$Impl_$.percent(this.top,this.bottom);
	}
	,equals: function(other) {
		return this.toFloat() == other.toFloat();
	}
	,reciprocal: function() {
		var tmp;
		var bottom = this.toFloat();
		tmp = new tannus_math_CRatio(1,bottom);
		return tmp;
	}
	,get_percent: function() {
		return this.toPercent();
	}
	,__class__: tannus_math_CRatio
	,__properties__: {get_percent:"get_percent"}
};
var tannus_math_TMath = $hx_exports.TMath = function() { };
$hxClasses["tannus.math.TMath"] = tannus_math_TMath;
tannus_math_TMath.__name__ = ["tannus","math","TMath"];
tannus_math_TMath.sum_Int = function(list) {
	var res = null;
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		if(!(res != null)) res = item; else res = (res != null?res:res) + item;
	}
	return res;
};
tannus_math_TMath.sum_Float = function(list) {
	var res = null;
	var _g = 0;
	while(_g < list.length) {
		var item = list[_g];
		++_g;
		if(!(res != null)) res = item; else res = (res != null?res:res) + item;
	}
	return res;
};
tannus_math_TMath.toRadians = function(degrees) {
	return degrees * 3.141592653589793 / 180;
};
tannus_math_TMath.toDegrees = function(radians) {
	return radians * 180 / 3.141592653589793;
};
tannus_math_TMath.angleBetween = function(x1,y1,x2,y2) {
	var tmp;
	var radians = Math.atan2(y2 - y1,x2 - x1);
	tmp = radians * 180 / 3.141592653589793;
	return tmp;
};
tannus_math_TMath.toFixed = function(n,c) {
	if(c == null) c = 0;
	var sn = Std.string(n);
	var bd = tannus_ds_StringUtils.before(sn,".");
	var wn = Std.parseInt(bd);
	var ad = "";
	var res = wn + "";
	if(tannus_ds_StringUtils.has(sn,".")) {
		ad = tannus_ds_StringUtils.after(sn,".");
		var sl = tannus_ds_StringUtils.slice(ad,0,c);
		if(ad.length > sl.length) {
			sl = tannus_ds_StringUtils.slice(ad,0,c + 1);
			var idec = Std.parseInt(sl);
			idec = Math.round(idec / 10);
			res += "." + idec;
		} else res += "." + sl;
	}
	return res;
};
tannus_math_TMath.max = function(a,b) {
	return a > b?a:b;
};
tannus_math_TMath.min = function(a,b) {
	return a < b?a:b;
};
tannus_math_TMath.maxr = function(nums) {
	var m = null;
	var $it0 = $iterator(nums)();
	while( $it0.hasNext() ) {
		var n = $it0.next();
		if(m == null) m = n;
		m = n > m?n:m;
	}
	return m;
};
tannus_math_TMath.minr = function(nums) {
	var m = null;
	var _g = 0;
	while(_g < nums.length) {
		var n = nums[_g];
		++_g;
		if(m == null) m = n;
		m = n < m?n:m;
	}
	return m;
};
tannus_math_TMath.range = function(nums) {
	var mi = null;
	var ma = null;
	var _g = 0;
	while(_g < nums.length) {
		var n = nums[_g];
		++_g;
		if(mi == null) mi = n;
		if(ma == null) ma = n;
		mi = n < mi?n:mi;
		ma = n > ma?n:ma;
	}
	return new tannus_ds_Range(mi,ma);
};
tannus_math_TMath.lerp = function(a,b,x) {
	return a + x * (b - a);
};
tannus_math_TMath.almostEquals = function(n,v,threshold) {
	return Math.abs(n - v) <= threshold;
};
tannus_math_TMath.i = function(f) {
	return f | 0;
};
tannus_math_TMath.roundFloat = function(f,digit) {
	var n = Math.pow(10,digit);
	var r = Math.round(f * n) / n;
	return r;
};
tannus_math_TMath.average = function(values) {
	var sum = 0;
	var _g = 0;
	while(_g < values.length) {
		var n = values[_g];
		++_g;
		sum += n;
	}
	return sum / values.length;
};
tannus_math_TMath.largest = function(items,predicate) {
	var highest = 0;
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		var tmp;
		var b = predicate(item);
		if(highest > b) tmp = highest; else tmp = b;
		highest = tmp;
	}
	return highest;
};
tannus_math_TMath.smallest = function(items,predicate) {
	var lowest = 0;
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		var tmp;
		var b = predicate(item);
		if(lowest < b) tmp = lowest; else tmp = b;
		lowest = tmp;
	}
	return lowest;
};
tannus_math_TMath.largestItem = function(items,predicate) {
	var asarr = Lambda.array(items);
	if(asarr.length == 0) return null; else if(asarr.length == 1) return asarr[0]; else if(asarr.length == 2) {
		var px = predicate(asarr[0]);
		var py = predicate(asarr[1]);
		if(px >= py) return asarr[0]; else return asarr[1];
	} else {
		var best = null;
		var $it0 = $iterator(items)();
		while( $it0.hasNext() ) {
			var item = $it0.next();
			var score = predicate(item);
			if(best == null || score > best.score) best = { 'item' : item, 'score' : score};
		}
		return best.item;
	}
};
tannus_math_TMath.minmax = function(items,predicate) {
	var res = new tannus_ds_FloatRange(NaN,NaN);
	var $it0 = $iterator(items)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		var score = predicate(item);
		if(res.max < score || isNaN(res.max)) res.max = score; else if(res.min > score || isNaN(res.min)) res.min = score;
		if(res.min > res.max) {
			var _t = res.max;
			res.max = res.min;
			res.min = _t;
		}
	}
	return res;
};
tannus_math_TMath.inRange = function(value,min,max) {
	return value >= min && value <= max;
};
tannus_math_TMath.sign = function(value) {
	return value < 0?-1:value > 0?1:0;
};
tannus_math_TMath.applySign = function(value,sign) {
	return value * sign;
};
tannus_math_TMath.sumf = function(set,extractor) {
	var res = null;
	var $it0 = $iterator(set)();
	while( $it0.hasNext() ) {
		var item = $it0.next();
		res = res != null?res + extractor(item):extractor(item);
	}
	return res;
};
tannus_math_TMath.sampleVariance = function(data) {
	var sampleSize = data.length;
	if(sampleSize < 2) return 0;
	var tmp;
	var sum = 0;
	var _g = 0;
	while(_g < data.length) {
		var n = data[_g];
		++_g;
		sum += n;
	}
	tmp = sum / data.length;
	var mean = tmp;
	return tannus_math_TMath.sum_Float(data.map(function(val) {
		return Math.pow(val - mean,2);
	})) / (sampleSize - 1);
};
tannus_math_TMath.standardDeviation = function(data) {
	return Math.sqrt(tannus_math_TMath.sampleVariance(data));
};
tannus_math_TMath.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
tannus_math_TMath.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af = f < 0?-f:f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
tannus_math_TMath.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
tannus_math_TMath.snap = function(value,min,step,max) {
	if(value < min) return min; else if(max != null && value > max) return max; else {
		var v = min;
		while(true) {
			if(value <= v) {
				var prev = v - step;
				if(value >= prev) {
					if(v - value < value - prev) return v; else return prev;
				}
			}
			v += step;
		}
	}
};
tannus_math_TMath.prettify = function(num,dec) {
	if(dec == null) dec = 0;
	var i = num | 0;
	var si = i == null?"null":"" + i;
	console.log(si);
	var tmp;
	var this1;
	this1 = tannus_io_impl_BrowserBinary.alloc(0);
	tmp = this1;
	var res = tmp;
	var index = si.length - 1;
	while(index >= 0) {
		var tmp1;
		if(index <= si.length - 1) {
			var n = HxOverrides.cca(si,index);
			var this2;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this2 = n;
			tmp1 = this2;
		} else throw new js__$Boot_HaxeError("IndexOutOfBoundError: " + index + " is not within range(0, " + (si.length - 1) + ")");
		var c = tmp1;
		res.push(c);
		if((index + 1) % 3 == 0) res.push(44);
		index--;
	}
	res.reverse();
	return res.toString();
};
var tannus_messaging_Channel = function(s,nam) {
	this.name = nam;
	this.owner = s;
	this.received = new tannus_io_Signal();
	this.streams = new haxe_ds_StringMap();
	this.owner.on(this.name,$bind(this,this._received));
};
$hxClasses["tannus.messaging.Channel"] = tannus_messaging_Channel;
tannus_messaging_Channel.__name__ = ["tannus","messaging","Channel"];
tannus_messaging_Channel.prototype = {
	send: function(data,cb) {
		this.owner.send(this.name,tannus_messaging_ChannelMessage.Normal(data),cb);
	}
	,listen: function(f) {
		this.received.listen(f,false);
	}
	,openChannel: function(sub) {
		var chan = new tannus_messaging_Channel(this.owner,"" + this.name + ":" + sub);
		return chan;
	}
	,stream: function(sname) {
		var ostream = new tannus_messaging_MessageOutStream(this.owner,sname);
		this.owner.on("" + this.name + ">>" + sname,function(msg) {
			{
				var _g = js_Boot.__cast(msg.data , tannus_messaging_ChannelMessage);
				switch(_g[1]) {
				case 1:
					var data = _g[2];
					ostream.open(data,function(value) {
						msg.reply(value);
					});
					break;
				default:
					throw new js__$Boot_HaxeError("Thats a bad.. mkay");
				}
			}
		});
		return ostream;
	}
	,openStream: function(sname,data) {
		var istream = new tannus_messaging_MessageInStream(this.owner,"" + this.name + ">>" + sname);
		istream.open(data);
		return istream;
	}
	,_received: function(msg) {
		if(js_Boot.__instanceof(msg.data,tannus_messaging_ChannelMessage)) {
			var cmsg = msg.data;
			switch(cmsg[1]) {
			case 0:
				msg.data = cmsg[2];
				this.received.broadcast(msg);
				break;
			default:
				console.log(msg);
				throw new js__$Boot_HaxeError("Unexpected " + Std.string(cmsg));
			}
		}
	}
	,__class__: tannus_messaging_Channel
};
var tannus_messaging_ChannelMessage = $hxClasses["tannus.messaging.ChannelMessage"] = { __ename__ : ["tannus","messaging","ChannelMessage"], __constructs__ : ["Normal","StreamOpen"] };
tannus_messaging_ChannelMessage.Normal = function(data) { var $x = ["Normal",0,data]; $x.__enum__ = tannus_messaging_ChannelMessage; $x.toString = $estr; return $x; };
tannus_messaging_ChannelMessage.StreamOpen = function(data) { var $x = ["StreamOpen",1,data]; $x.__enum__ = tannus_messaging_ChannelMessage; $x.toString = $estr; return $x; };
var tannus_messaging_Message = function(sock,dat) {
	this.id = tannus_ds_Memory.uniqueIdString("msg-");
	this.sender = sock;
	this.data = dat;
	this.meta = { };
	this.type = tannus_messaging_MessageType.Normal;
	this.channel = "";
};
$hxClasses["tannus.messaging.Message"] = tannus_messaging_Message;
tannus_messaging_Message.__name__ = ["tannus","messaging","Message"];
tannus_messaging_Message.fromSafe = function(sock,saf) {
	var m = new tannus_messaging_Message(sock,haxe_Unserializer.run(saf.data));
	m.id = saf.id;
	m.sender_id = saf.sender_id;
	m.type = haxe_Unserializer.run(saf.type);
	m.channel = saf.channel;
	m.meta = saf.meta;
	return m;
};
tannus_messaging_Message.prototype = {
	safe: function() {
		return new tannus_messaging_SafeMessage({ 'id' : this.id, 'sender_id' : this.sender.id, 'type' : haxe_Serializer.run(this.type), 'channel' : this.channel, 'meta' : haxe_Serializer.run(this.meta), 'data' : haxe_Serializer.run(this.data)});
	}
	,reply: function(data) {
		var repl = new tannus_messaging_Message(this.sender,data);
		repl.type = tannus_messaging_MessageType.Reply;
		repl.id = this.id;
		this.sender.sendToPeer(repl);
	}
	,__class__: tannus_messaging_Message
};
var tannus_messaging_MessageInStream = function(s,nam) {
	tannus_io_EventDispatcher.call(this);
	this.owner = s;
	this.name = nam;
	this.buf = [];
	this.desired = 0;
	this.received = new tannus_io_Signal();
	this.closed = false;
	this.addSignal("closed");
};
$hxClasses["tannus.messaging.MessageInStream"] = tannus_messaging_MessageInStream;
tannus_messaging_MessageInStream.__name__ = ["tannus","messaging","MessageInStream"];
tannus_messaging_MessageInStream.__super__ = tannus_io_EventDispatcher;
tannus_messaging_MessageInStream.prototype = $extend(tannus_io_EventDispatcher.prototype,{
	open: function(data) {
		var mdata = tannus_messaging_ChannelMessage.StreamOpen(data);
		this.owner.send(this.name,mdata,$bind(this,this.write));
	}
	,close: function() {
		this.closed = true;
		this.dispatch("closed",null);
	}
	,write: function(chunk) {
		if(this.closed) return;
		if(this.desired > 0) {
			console.log("fulfilling queued READ requests");
			this.desired--;
			this.received.broadcast(chunk);
		} else {
			console.log("buffering data");
			this.buf.push(this.decode(chunk));
		}
	}
	,next: function(cb) {
		var _g = this;
		if(this.closed) return;
		if(this.buf.length > 0) {
			console.log("reading data from buffer");
			window.setTimeout(function() {
				cb(_g.buf.pop());
			},1);
		} else {
			this.desired++;
			var called = false;
			this.received.listen(function(sm) {
				if(!called) cb(_g.decode(sm)); else console.log("ONCE fires multiple times");
				called = true;
			},true);
		}
	}
	,read: function(count,cb) {
		var _g = this;
		var results = [];
		var tmp;
		var wait1 = null;
		wait1 = function() {
			_g.next(function(chunk) {
				console.log(chunk);
				results.push(chunk);
				if(results.length == count) cb(results); else wait1();
			});
		};
		tmp = wait1;
		var wait = tmp;
		wait();
	}
	,all: function(cb) {
		var _g = this;
		var tmp;
		var step1 = null;
		step1 = function(v) {
			cb(v);
			_g.next(step1);
		};
		tmp = step1;
		var step = tmp;
		this.next(step);
	}
	,decode: function(data) {
		switch(data[1]) {
		case 0:
			return data[2];
		case 2:
			this.close();
			return null;
		default:
			console.log("Unexpected " + Std.string(data));
			return null;
		}
	}
	,__class__: tannus_messaging_MessageInStream
});
var tannus_messaging_MessageOutStream = function(messager,nam) {
	tannus_io_EventDispatcher.call(this);
	this.owner = messager;
	this.name = nam;
	this.addSignal("open");
};
$hxClasses["tannus.messaging.MessageOutStream"] = tannus_messaging_MessageOutStream;
tannus_messaging_MessageOutStream.__name__ = ["tannus","messaging","MessageOutStream"];
tannus_messaging_MessageOutStream.__super__ = tannus_io_EventDispatcher;
tannus_messaging_MessageOutStream.prototype = $extend(tannus_io_EventDispatcher.prototype,{
	open: function(data,wf) {
		this._write = wf;
		this.dispatch("open",data);
	}
	,write: function(v) {
		this._write(tannus_messaging_StreamMessage.SData(v));
	}
	,close: function() {
		this._write(tannus_messaging_StreamMessage.SClose);
	}
	,__class__: tannus_messaging_MessageOutStream
});
var tannus_messaging_MessageType = $hxClasses["tannus.messaging.MessageType"] = { __ename__ : ["tannus","messaging","MessageType"], __constructs__ : ["Normal","Reply","Broadcast"] };
tannus_messaging_MessageType.Normal = ["Normal",0];
tannus_messaging_MessageType.Normal.toString = $estr;
tannus_messaging_MessageType.Normal.__enum__ = tannus_messaging_MessageType;
tannus_messaging_MessageType.Reply = ["Reply",1];
tannus_messaging_MessageType.Reply.toString = $estr;
tannus_messaging_MessageType.Reply.__enum__ = tannus_messaging_MessageType;
tannus_messaging_MessageType.Broadcast = ["Broadcast",2];
tannus_messaging_MessageType.Broadcast.toString = $estr;
tannus_messaging_MessageType.Broadcast.__enum__ = tannus_messaging_MessageType;
var tannus_messaging_SafeMessage = function(data) {
	tannus_ds__$Object_Object_$Impl_$.write(this,data);
};
$hxClasses["tannus.messaging.SafeMessage"] = tannus_messaging_SafeMessage;
tannus_messaging_SafeMessage.__name__ = ["tannus","messaging","SafeMessage"];
tannus_messaging_SafeMessage.isSafeMessage = function(o) {
	var tmp;
	var tmp4;
	var tmp5;
	if(o == null) tmp4 = null; else if(o.__properties__ && (tmp5 = o.__properties__["get_" + "id"])) tmp4 = o[tmp5](); else tmp4 = o.id;
	var this1 = tmp4;
	if(this1 != null) tmp = this1; else tmp = this1;
	var id = tmp;
	var tmp1;
	var tmp6;
	var tmp7;
	if(o == null) tmp6 = null; else if(o.__properties__ && (tmp7 = o.__properties__["get_" + "sender_id"])) tmp6 = o[tmp7](); else tmp6 = o.sender_id;
	var this2 = tmp6;
	if(this2 != null) tmp1 = this2; else tmp1 = this2;
	var sid = tmp1;
	var tmp2;
	var tmp8;
	var tmp9;
	if(o == null) tmp8 = null; else if(o.__properties__ && (tmp9 = o.__properties__["get_" + "type"])) tmp8 = o[tmp9](); else tmp8 = o.type;
	var this3 = tmp8;
	if(this3 != null) tmp2 = this3; else tmp2 = this3;
	var type = tmp2;
	var tmp3;
	var tmp10;
	var tmp11;
	if(o == null) tmp10 = null; else if(o.__properties__ && (tmp11 = o.__properties__["get_" + "channel"])) tmp10 = o[tmp11](); else tmp10 = o.channel;
	var this4 = tmp10;
	if(this4 != null) tmp3 = this4; else tmp3 = this4;
	var channel = tmp3;
	return id != null && typeof(id != null?id:id) == "string" && (sid != null && typeof(sid != null?sid:sid) == "string") && (channel != null && typeof(channel != null?channel:channel) == "string") && tannus_messaging_SafeMessage.isMessageType(type);
};
tannus_messaging_SafeMessage.isMessageType = function(o) {
	try {
		if(!(o != null) || !(typeof(o != null?o:o) == "string")) return false; else {
			var type = haxe_Unserializer.run(o);
			switch(type[1]) {
			case 0:case 1:case 2:
				return true;
			}
		}
	} catch( error ) {
		if (error instanceof js__$Boot_HaxeError) error = error.val;
		return false;
	}
};
tannus_messaging_SafeMessage.prototype = {
	get_raw: function() {
		return { 'id' : this.id, 'sender_id' : this.sender_id, 'type' : this.type, 'channel' : this.channel, 'meta' : this.meta, 'data' : this.data};
	}
	,set_raw: function(v) {
		tannus_ds__$Object_Object_$Impl_$.write(this,v);
		return { 'id' : this.id, 'sender_id' : this.sender_id, 'type' : this.type, 'channel' : this.channel, 'meta' : this.meta, 'data' : this.data};
	}
	,__class__: tannus_messaging_SafeMessage
	,__properties__: {set_raw:"set_raw",get_raw:"get_raw"}
};
var tannus_messaging_StreamMessage = $hxClasses["tannus.messaging.StreamMessage"] = { __ename__ : ["tannus","messaging","StreamMessage"], __constructs__ : ["SData","SOpen","SClose"] };
tannus_messaging_StreamMessage.SData = function(v) { var $x = ["SData",0,v]; $x.__enum__ = tannus_messaging_StreamMessage; $x.toString = $estr; return $x; };
tannus_messaging_StreamMessage.SOpen = ["SOpen",1];
tannus_messaging_StreamMessage.SOpen.toString = $estr;
tannus_messaging_StreamMessage.SOpen.__enum__ = tannus_messaging_StreamMessage;
tannus_messaging_StreamMessage.SClose = ["SClose",2];
tannus_messaging_StreamMessage.SClose.toString = $estr;
tannus_messaging_StreamMessage.SClose.__enum__ = tannus_messaging_StreamMessage;
var tannus_nore_Check = $hxClasses["tannus.nore.Check"] = { __ename__ : ["tannus","nore","Check"], __constructs__ : ["TypeCheck","LooseTypeCheck","ShortTypeCheck","NestedCheck","FieldExistsCheck","FieldValueCheck","FieldValueBlockCheck","FieldValueTypeCheck","HelperCheck","GroupCheck","EitherCheck","InvertedCheck","TernaryCheck"] };
tannus_nore_Check.TypeCheck = function(t) { var $x = ["TypeCheck",0,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.LooseTypeCheck = function(t) { var $x = ["LooseTypeCheck",1,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.ShortTypeCheck = function(t) { var $x = ["ShortTypeCheck",2,t]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.NestedCheck = function(op,value) { var $x = ["NestedCheck",3,op,value]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldExistsCheck = function(name) { var $x = ["FieldExistsCheck",4,name]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueCheck = function(op,name,value) { var $x = ["FieldValueCheck",5,op,name,value]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueBlockCheck = function(name,checks) { var $x = ["FieldValueBlockCheck",6,name,checks]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.FieldValueTypeCheck = function(name,type,loose) { var $x = ["FieldValueTypeCheck",7,name,type,loose]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.HelperCheck = function(name,args) { var $x = ["HelperCheck",8,name,args]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.GroupCheck = function(checks) { var $x = ["GroupCheck",9,checks]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.EitherCheck = function(left,right) { var $x = ["EitherCheck",10,left,right]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.InvertedCheck = function(check) { var $x = ["InvertedCheck",11,check]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
tannus_nore_Check.TernaryCheck = function(condition,itrue,ifalse) { var $x = ["TernaryCheck",12,condition,itrue,ifalse]; $x.__enum__ = tannus_nore_Check; $x.toString = $estr; return $x; };
var tannus_nore_Compiler = function() {
	this.reset();
};
$hxClasses["tannus.nore.Compiler"] = tannus_nore_Compiler;
tannus_nore_Compiler.__name__ = ["tannus","nore","Compiler"];
tannus_nore_Compiler.prototype = {
	compileString: function(s) {
		var l = new tannus_nore_Lexer();
		var $it0 = this.operators.keys();
		while( $it0.hasNext() ) {
			var s1 = $it0.next();
			l.operators.push(s1);
		}
		var p = new tannus_nore_Parser();
		var toks = l.lex(s);
		var tree = p.parse(toks);
		return this.compile(tree);
	}
	,compile: function(checkList) {
		this.checks = new tannus_ds_Stack(checkList);
		while(!this.checks.get_empty()) {
			var cf = this.compileCheck(this.checks.pop());
			this.checkFuncs.push(cf);
		}
		var tmp;
		var f = $bind(this,this.testAll);
		tmp = function(o) {
			return f(o);
		};
		return tmp;
	}
	,compileCheck: function(check) {
		var _g = this;
		switch(check[1]) {
		case 9:
			var list = check[2];
			var state = this.save();
			var child = new tannus_nore_Compiler();
			child.restore(state);
			return child.compile(list);
		case 0:
			var type = check[2];
			var tmp;
			var f = ($_=this.tools,$bind($_,$_.checkType));
			var a1 = type;
			tmp = function(o) {
				return f(o,a1,false);
			};
			return tmp;
		case 1:
			var type1 = check[2];
			var tmp1;
			var f1 = ($_=this.tools,$bind($_,$_.checkType));
			var a11 = type1;
			tmp1 = function(o1) {
				return f1(o1,a11,true);
			};
			return tmp1;
		case 2:
			var type2 = check[2];
			var tmp2;
			var f2 = ($_=this.tools,$bind($_,$_.checkShortType));
			var a12 = type2;
			tmp2 = function(o2) {
				return f2(o2,a12);
			};
			return tmp2;
		case 3:
			var value = check[3];
			var sop = check[2];
			var tmp3;
			var _this = this.operators;
			if(__map_reserved[sop] != null) tmp3 = _this.existsReserved(sop); else tmp3 = _this.h.hasOwnProperty(sop);
			if(tmp3) {
				var tmp4;
				var _this1 = this.operators;
				if(__map_reserved[sop] != null) tmp4 = _this1.getReserved(sop); else tmp4 = _this1.h[sop];
				var op = tmp4;
				return function(o3) {
					var tmp5;
					var this1 = tannus_nore_ValueTools.haxeValue(value,_g.tools,o3);
					tmp5 = this1();
					return op(o3,tmp5);
				};
			} else throw new js__$Boot_HaxeError("CompilationError: Invalid operator \"" + sop + "\"!");
			break;
		case 4:
			var name = check[2];
			var tmp6;
			var f3 = ($_=this.tools,$bind($_,$_.has));
			var a13 = name;
			tmp6 = function(o4) {
				return f3(o4,a13);
			};
			return tmp6;
		case 5:
			var value1 = check[4];
			var name1 = check[3];
			var sop1 = check[2];
			var tmp7;
			var _this2 = this.operators;
			if(__map_reserved[sop1] != null) tmp7 = _this2.existsReserved(sop1); else tmp7 = _this2.h.hasOwnProperty(sop1);
			if(tmp7) {
				var tmp8;
				var _this3 = this.operators;
				if(__map_reserved[sop1] != null) tmp8 = _this3.getReserved(sop1); else tmp8 = _this3.h[sop1];
				var op1 = tmp8;
				return function(o5) {
					var tmp9;
					var this2 = tannus_nore_ValueTools.haxeValue(value1,_g.tools,o5);
					tmp9 = this2();
					return op1(_g.tools.get(o5,name1),tmp9);
				};
			} else throw new js__$Boot_HaxeError("CompilationError: Invalid operator \"" + sop1 + "\"!");
			break;
		case 7:
			var loose = check[4];
			var type3 = check[3];
			var name2 = check[2];
			return function(o6) {
				return _g.tools.checkType(_g.tools.get(o6,name2),type3,loose);
			};
		case 6:
			var block = check[3];
			var name3 = check[2];
			var tmp10;
			var f4 = ($_=this.tools,$bind($_,$_.get));
			var a14 = name3;
			tmp10 = function(o7) {
				return f4(o7,a14);
			};
			var getit = tmp10;
			var test = this.sub(block);
			return function(o8) {
				var ctx = getit(o8);
				return test(ctx);
			};
		case 8:
			var vargs = check[3];
			var name4 = check[2];
			var tmp11;
			var f5 = ($_=this.tools,$bind($_,$_.helper_check));
			var a15 = name4;
			var a2 = vargs;
			tmp11 = function(o9) {
				return f5(o9,a15,a2);
			};
			return tmp11;
		case 10:
			var cright = check[3];
			var cleft = check[2];
			var left = this.compileCheck(cleft);
			var right = this.compileCheck(cright);
			return function(o10) {
				return left(o10) || right(o10);
			};
		case 11:
			var cc = check[2];
			var c = this.compileCheck(cc);
			return function(o11) {
				return !c(o11);
			};
		case 12:
			var cfalse = check[4];
			var ctrue = check[3];
			var ccondition = check[2];
			var cond = this.compileCheck(ccondition);
			var itrue = this.compileCheck(ctrue);
			var ifalse = cfalse != null?this.compileCheck(cfalse):null;
			return function(o12) {
				if(cond(o12)) return itrue(o12); else if(ifalse != null) return ifalse(o12); else return true;
			};
		}
	}
	,reset: function() {
		this.checks = new tannus_ds_Stack();
		this.checkFuncs = [];
		try {
			var _this = this.operators;
			if(__map_reserved[""] != null) _this.existsReserved(""); else _this.h.hasOwnProperty("");
		} catch( error ) {
			if (error instanceof js__$Boot_HaxeError) error = error.val;
			this.operators = new haxe_ds_StringMap();
		}
		try {
			var _this1 = this.helpers;
			if(__map_reserved[""] != null) _this1.existsReserved(""); else _this1.h.hasOwnProperty("");
		} catch( error1 ) {
			if (error1 instanceof js__$Boot_HaxeError) error1 = error1.val;
			this.helpers = new haxe_ds_StringMap();
		}
		this.tools = new tannus_nore_CompilerTools(this);
		this.initOperators();
		this.initHelpers();
	}
	,initOperators: function() {
		var _g = this;
		var eq2 = function(x,y) {
			if(tannus_internal_TypeTools.typename(x) == tannus_internal_TypeTools.typename(y)) {
				if(x == y) return true; else {
					var eq = _g.tools.get(x,"equals");
					if(Reflect.isFunction(eq)) try {
						var tmp;
						var func = eq;
						tmp = func.apply(x,[y]);
						var eqv = tmp;
						if(eqv != null) return eqv == true;
					} catch( err ) {
						if (err instanceof js__$Boot_HaxeError) err = err.val;
						null;
					}
					var eq1 = _g.tools.get(y,"equals");
					if(Reflect.isFunction(eq1)) try {
						var tmp1;
						var func1 = eq1;
						tmp1 = func1.apply(y,[x]);
						var eqv1 = tmp1;
						if(eqv1 != null) return eqv1 == true;
					} catch( err1 ) {
						if (err1 instanceof js__$Boot_HaxeError) err1 = err1.val;
						null;
					}
					return false;
				}
			} else return false;
		};
		var _this = this.operators;
		if(__map_reserved["=="] != null) _this.setReserved("==",eq2); else _this.h["=="] = eq2;
		var _this1 = this.operators;
		if(__map_reserved["!="] != null) _this1.setReserved("!=",function(x5,y5) {
			return !eq2(x5,y5);
		}); else _this1.h["!="] = function(x5,y5) {
			return !eq2(x5,y5);
		};
		var greaterThan = function(x1,y1) {
			if(tannus_internal_TypeTools.typename(x1) == "Number" && tannus_internal_TypeTools.typename(y1) == "Number") return x1 > y1; else return false;
		};
		var lessThan = function(x2,y2) {
			if(tannus_internal_TypeTools.typename(x2) == "Number" && tannus_internal_TypeTools.typename(y2) == "Number") return x2 < y2; else return false;
		};
		var _this2 = this.operators;
		if(__map_reserved[">"] != null) _this2.setReserved(">",greaterThan); else _this2.h[">"] = greaterThan;
		var _this3 = this.operators;
		if(__map_reserved["<"] != null) _this3.setReserved("<",lessThan); else _this3.h["<"] = lessThan;
		var _this4 = this.operators;
		if(__map_reserved[">="] != null) _this4.setReserved(">=",function(x6,y6) {
			return greaterThan(x6,y6) || eq2(x6,y6);
		}); else _this4.h[">="] = function(x6,y6) {
			return greaterThan(x6,y6) || eq2(x6,y6);
		};
		var _this5 = this.operators;
		if(__map_reserved["<="] != null) _this5.setReserved("<=",function(x7,y7) {
			return lessThan(x7,y7) || eq2(x7,y7);
		}); else _this5.h["<="] = function(x7,y7) {
			return lessThan(x7,y7) || eq2(x7,y7);
		};
		var has = function(x3,y3) {
			if(typeof(x3) == "string") return tannus_ds_StringUtils.has(js_Boot.__cast(x3 , String),Std.string(y3)); else if((x3 instanceof Array) && x3.__enum__ == null) return Lambda.has(js_Boot.__cast(x3 , Array),y3); else return false;
		};
		var _this6 = this.operators;
		if(__map_reserved.has != null) _this6.setReserved("has",has); else _this6.h["has"] = has;
		var _this7 = this.operators;
		if(__map_reserved.contains != null) _this7.setReserved("contains",has); else _this7.h["contains"] = has;
		var regtest = function(x4,y4) {
			{
				var _g1 = [x4,y4].map(function(o) {
					return tannus_internal_TypeTools.typename(o);
				});
				switch(_g1.length) {
				case 2:
					switch(_g1[1]) {
					case "String":
						var reg = new EReg(Std.string(y4),"");
						return reg.match(Std.string(x4));
					default:
						return false;
					}
					break;
				default:
					return false;
				}
			}
		};
		var _this8 = this.operators;
		if(__map_reserved["~="] != null) _this8.setReserved("~=",regtest); else _this8.h["~="] = regtest;
	}
	,initHelpers: function() {
	}
	,operator: function(name,f) {
		var _this = this.operators;
		if(__map_reserved[name] != null) _this.setReserved(name,f); else _this.h[name] = f;
	}
	,helper: function(name,f) {
		var _this = this.helpers;
		if(__map_reserved[name] != null) _this.setReserved(name,f); else _this.h[name] = f;
	}
	,save: function() {
		return { 'checks' : this.checks.copy(), 'checkFuncs' : this.checkFuncs.slice(), 'operators' : this.copyOperators(), 'helpers' : this.copyHelpers(), 'tools' : this.tools};
	}
	,restore: function(s) {
		this.checks = s.checks;
		this.checkFuncs = s.checkFuncs;
		this.operators = s.operators;
		this.helpers = s.helpers;
		this.tools = s.tools;
	}
	,sub: function(checkList) {
		var subc = new tannus_nore_Compiler();
		subc.tools = this.tools;
		subc.operators = this.copyOperators();
		subc.helpers = this.copyHelpers();
		var f = subc.compile(checkList);
		return f;
	}
	,copyOperators: function() {
		var copy = new haxe_ds_StringMap();
		var $it0 = this.operators.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var tmp;
			var _this = this.operators;
			if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
			var value = tmp;
			if(__map_reserved[key] != null) copy.setReserved(key,value); else copy.h[key] = value;
		}
		return copy;
	}
	,copyHelpers: function() {
		var copy = new haxe_ds_StringMap();
		var $it0 = this.helpers.keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			var tmp;
			var _this = this.helpers;
			if(__map_reserved[key] != null) tmp = _this.getReserved(key); else tmp = _this.h[key];
			var value = tmp;
			if(__map_reserved[key] != null) copy.setReserved(key,value); else copy.h[key] = value;
		}
		return copy;
	}
	,testAll: function(o) {
		var _g = 0;
		var _g1 = this.checkFuncs;
		while(_g < _g1.length) {
			var check = _g1[_g];
			++_g;
			if(!check(o)) return false;
		}
		return true;
	}
	,get_end: function() {
		return this.checks.get_empty();
	}
	,__class__: tannus_nore_Compiler
	,__properties__: {get_end:"get_end"}
};
var tannus_nore_CompilerTools = function(owner) {
	this.c = owner;
};
$hxClasses["tannus.nore.CompilerTools"] = tannus_nore_CompilerTools;
tannus_nore_CompilerTools.__name__ = ["tannus","nore","CompilerTools"];
tannus_nore_CompilerTools.prototype = {
	has: function(o,name) {
		return Object.prototype.hasOwnProperty.call(o,name);
	}
	,get: function(o,name) {
		var tmp;
		var tmp1;
		if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + name])) tmp = o[tmp1](); else tmp = o[name];
		return tmp;
	}
	,checkType: function(o,type,loose) {
		if(loose == null) loose = false;
		if(!loose) return tannus_internal_TypeTools.typename(o) == type; else {
			var tc = Type.resolveClass(type);
			return js_Boot.__instanceof(o,tc);
		}
	}
	,checkShortType: function(o,type) {
		var className = tannus_ds_ArrayTools.last(tannus_internal_TypeTools.typename(o).split("."));
		return className == type;
	}
	,helper_check: function(o,name,vargs) {
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < vargs.length) {
			var v = vargs[_g1];
			++_g1;
			var tmp2;
			var this1 = tannus_nore_ValueTools.haxeValue(v,this,o);
			tmp2 = this1();
			_g.push(tmp2);
		}
		tmp = _g;
		var args = tmp;
		var tmp1;
		var _this = this.c.helpers;
		if(__map_reserved[name] != null) tmp1 = _this.existsReserved(name); else tmp1 = _this.h.hasOwnProperty(name);
		if(tmp1) {
			var tmp3;
			var _this1 = this.c.helpers;
			if(__map_reserved[name] != null) tmp3 = _this1.getReserved(name); else tmp3 = _this1.h[name];
			var help = tmp3;
			return help(o,args);
		} else if(this.has(o,name)) {
			var v1 = this.get(o,name);
			if(typeof(v1) == "boolean") return v1; else if(Reflect.isFunction(v1)) {
				var tmp4;
				var func = this.get(o,name);
				tmp4 = func.apply(o,args);
				return tmp4 == true;
			} else return false;
		} else return false;
	}
	,__class__: tannus_nore_CompilerTools
};
var tannus_nore_Lexer = function() {
	this.tokens = [];
	this.canCall = false;
	this.inTernary = false;
	var tmp;
	var this1;
	this1 = tannus_io_impl_BrowserBinary.alloc(0);
	tmp = this1;
	this.bytes = new tannus_io_ByteStack(tmp);
	this.operators = [];
	this.operators.push("=>");
	this.operators.push("is");
	this.operators.push("has");
	this.operators.push("contains");
};
$hxClasses["tannus.nore.Lexer"] = tannus_nore_Lexer;
tannus_nore_Lexer.__name__ = ["tannus","nore","Lexer"];
tannus_nore_Lexer.lexString = function(s) {
	return new tannus_nore_Lexer().lex(s);
};
tannus_nore_Lexer.prototype = {
	operator: function(op) {
		this.operators.push(op);
	}
	,lex: function(s) {
		this.tokens = [];
		this.canCall = false;
		this.inTernary = false;
		var tmp;
		var this1;
		this1 = tannus_io_impl_BrowserBinary.alloc(0);
		tmp = this1;
		this.bytes = new tannus_io_ByteStack(tmp);
		this.bytes = new tannus_io_ByteStack(tannus_io_impl_BrowserBinary.ofString(s));
		while(!this.bytes.get_empty()) {
			var t = this.lexNext();
			if(t != null) this.tokens.push(t);
		}
		return this.tokens;
	}
	,lexNext: function() {
		var c = this.bytes.peek();
		if(Lambda.has([9,10,11,12,13,32],c)) {
			this.bytes.pop();
			if(!this.bytes.get_empty()) return this.lexNext(); else return null;
		} else if(c >= 65 && c <= 90 || c >= 97 && c <= 122 || c == 95) {
			var id = String.fromCharCode(c);
			this.bytes.pop();
			while(!this.bytes.get_empty() && this.isIdent(this.bytes.peek())) {
				var tmp;
				var this1 = this.bytes.pop();
				tmp = String.fromCharCode(this1);
				id += tmp;
			}
			if(Lambda.has(this.operators,id)) return tannus_nore_Token.TOperator(id);
			if(Lambda.has(["if"],id.toLowerCase())) return this.lexStructure(id.toLowerCase()); else return tannus_nore_Token.TConst(tannus_nore_Const.CIdent(id));
		} else if(c == 64) {
			this.bytes.pop();
			var id1 = "";
			while(!this.bytes.get_empty() && this.isIdent(this.bytes.peek())) {
				var tmp1;
				var this2 = this.bytes.pop();
				tmp1 = String.fromCharCode(this2);
				id1 += tmp1;
			}
			return tannus_nore_Token.TConst(tannus_nore_Const.CReference(id1));
		} else if(Lambda.has([34,39,96],c)) {
			var delimiter = this.bytes.pop();
			var tmp2;
			switch(delimiter) {
			case 39:
				tmp2 = 1;
				break;
			case 34:
				tmp2 = 2;
				break;
			case 96:
				tmp2 = 3;
				break;
			default:
				tmp2 = -1;
			}
			var level = tmp2;
			var tmp3;
			var this3 = this.bytes.readUntil(delimiter);
			tmp3 = this3.toString();
			var str = tmp3;
			this.bytes.pop();
			return tannus_nore_Token.TConst(tannus_nore_Const.CString(str,level));
		} else if(c >= 48 && c <= 57) {
			var tmp4;
			var this4 = this.bytes.pop();
			tmp4 = String.fromCharCode(this4);
			var snum = tmp4;
			while(true) {
				var tmp5;
				if(!this.bytes.get_empty()) {
					var tmp7;
					var this5 = this.bytes.peek();
					if(this5 >= 48) tmp7 = this5 <= 57; else tmp7 = false;
					if(!tmp7) {
						var this6 = this.bytes.peek();
						tmp5 = this6 == HxOverrides.cca(".",0);
					} else tmp5 = true;
				} else tmp5 = false;
				if(!tmp5) break;
				var tmp6;
				var this7 = this.bytes.pop();
				tmp6 = String.fromCharCode(this7);
				snum += tmp6;
			}
			return tannus_nore_Token.TConst(tannus_nore_Const.CNumber(parseFloat(snum)));
		} else if(c == 91) {
			var tmp8;
			var tmp9;
			var n = HxOverrides.cca("[",0);
			var this9;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n + ")!");
			this9 = n;
			tmp9 = this9;
			var tmp10;
			var n1 = HxOverrides.cca("]",0);
			var this10;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n1)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n1 + ")!");
			this10 = n1;
			tmp10 = this10;
			var this8 = this.readGroup(tmp9,tmp10);
			tmp8 = this8.toString();
			var sgroup = tmp8;
			var group = this.sub(sgroup);
			return tannus_nore_Token.TBrackets(group);
		} else if(c == 123) {
			var tmp11;
			var tmp12;
			var n2 = HxOverrides.cca("{",0);
			var this12;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n2)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n2 + ")!");
			this12 = n2;
			tmp12 = this12;
			var tmp13;
			var n3 = HxOverrides.cca("}",0);
			var this13;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n3)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n3 + ")!");
			this13 = n3;
			tmp13 = this13;
			var this11 = this.readGroup(tmp12,tmp13);
			tmp11 = this11.toString();
			var sg = tmp11;
			var g = this.sub(sg);
			return tannus_nore_Token.TBoxBrackets(g);
		} else if(this.isOpChar(c)) {
			var state = this.save();
			var tmp14;
			var this14 = this.bytes.pop();
			tmp14 = String.fromCharCode(this14);
			var op = tmp14;
			while(!this.bytes.get_empty() && this.isOpChar(this.bytes.peek())) {
				var tmp15;
				var this15 = this.bytes.pop();
				tmp15 = String.fromCharCode(this15);
				op += tmp15;
			}
			if(Lambda.has(this.operators,op)) return tannus_nore_Token.TOperator(op); else switch(op) {
			case "!":
				return tannus_nore_Token.TNot;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Invalid operator \"" + op + "\"!");
				return null;
			}
		} else if(c == 40) {
			var tmp16;
			var n4 = HxOverrides.cca("(",0);
			var this16;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n4)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n4 + ")!");
			this16 = n4;
			tmp16 = this16;
			var tmp17;
			var n5 = HxOverrides.cca(")",0);
			var this17;
			if(!tannus_io__$Byte_Byte_$Impl_$.isValid(n5)) throw new js__$Boot_HaxeError("Invalid Byte Value (" + n5 + ")!");
			this17 = n5;
			tmp17 = this17;
			var s = this.readGroup(tmp16,tmp17);
			var toklist = s._length <= 0?[]:this.sub(s.toString());
			var treeStack = new tannus_ds_Stack(toklist.slice());
			var tree = [];
			var hasComma = false;
			while(!treeStack.get_empty()) {
				var t = treeStack.pop();
				var tmp18;
				switch(t[1]) {
				case 9:
					tmp18 = true;
					break;
				default:
					tmp18 = false;
				}
				if(!tmp18) tree.push(t); else hasComma = true;
			}
			if(hasComma) return tannus_nore_Token.TTuple(tree); else return tannus_nore_Token.TGroup(toklist);
		} else if(c == 44) {
			this.bytes.pop();
			return tannus_nore_Token.TComma;
		} else if(c == 124) {
			this.bytes.pop();
			return tannus_nore_Token.TOr;
		} else if(c == 58) {
			this.bytes.pop();
			this.canCall = true;
			var name = this.lexNext();
			if(name != null) switch(name[1]) {
			case 0:
				switch(name[2][1]) {
				case 0:
					var name1 = name[2][2];
					if(!this.bytes.get_empty()) {
						var state1 = this.save();
						var targs = this.lexNext();
						if(targs != null) switch(targs[1]) {
						case 5:
							var args = targs[2];
							console.log("helper");
							return tannus_nore_Token.THelper(name1,args);
						case 4:
							var __ex0 = targs[2];
							{
								var _g = __ex0[0];
								var arg = _g;
								console.log("helper");
								return tannus_nore_Token.THelper(name1,[arg]);
							}
							break;
						default:
							this.restore(state1);
							console.log("helper");
							return tannus_nore_Token.THelper(name1,[]);
						} else {
							this.restore(state1);
							console.log("helper");
							return tannus_nore_Token.THelper(name1,[]);
						}
					} else {
						console.log("helper");
						return tannus_nore_Token.THelper(name1,[]);
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
			} else throw new js__$Boot_HaxeError("SyntaxError: Expected identifier, got " + Std.string(name));
		} else if(c == 46) {
			this.bytes.pop();
			var tmp19;
			var this18 = this.bytes.peek();
			tmp19 = this18 == 46;
			if(tmp19) {
				this.bytes.pop();
				return tannus_nore_Token.TDoubleDot;
			} else {
				var tmp20;
				var this19 = this.bytes.peek();
				tmp20 = String.fromCharCode(this19);
				throw new js__$Boot_HaxeError("SyntaxError: Expected \".\", got " + tmp20);
			}
		} else if(c == 126) {
			this.bytes.pop();
			return tannus_nore_Token.TApprox;
		} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"" + String.fromCharCode(c) + "\"!");
	}
	,lexStructure: function(kw) {
		switch(kw) {
		case "if":
			var cond = this.lexNext();
			console.log(cond);
			var then = this.lexNext();
			console.log(then);
			switch(then[1]) {
			case 0:
				switch(then[2][1]) {
				case 0:
					switch(then[2][2]) {
					case "then":
						var itrue = this.lexNext();
						console.log(itrue);
						var ifalse = null;
						if(!this.bytes.get_empty()) {
							var state = this.save();
							var otherwise = this.lexNext();
							switch(otherwise[1]) {
							case 0:
								switch(otherwise[2][1]) {
								case 0:
									switch(otherwise[2][2]) {
									case "else":
										ifalse = this.lexNext();
										console.log(ifalse);
										break;
									default:
										this.restore(state);
									}
									break;
								default:
									this.restore(state);
								}
								break;
							default:
								this.restore(state);
							}
						}
						if(cond != null) {
						} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected if!");
						if(itrue != null) {
						} else throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
						return tannus_nore_Token.TIf(cond,itrue,ifalse);
					default:
						throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(then) + "!");
			}
			break;
		default:
			throw new js__$Boot_HaxeError("FuckUpError: \"" + kw + "\" is not a keyword");
		}
	}
	,readGroup: function(start,end) {
		var c = this.bytes.peek();
		if(c == start) {
			var level = 1;
			var tmp1;
			var this1;
			this1 = tannus_io_impl_BrowserBinary.alloc(0);
			tmp1 = this1;
			var data = tmp1;
			this.bytes.pop();
			while(level > 0) {
				c = this.bytes.peek();
				if(c == start) level++; else if(c == end) level--;
				if(level > 0) data.push(c);
				this.bytes.pop();
			}
			return data;
		}
		var tmp;
		var this2;
		this2 = tannus_io_impl_BrowserBinary.alloc(0);
		tmp = this2;
		return tmp;
	}
	,sub: function(s) {
		var state = this.save();
		var _it = this.inTernary;
		var result = this.lex(s);
		this.restore(state);
		this.inTernary = _it;
		return result;
	}
	,reset: function() {
		this.tokens = [];
		this.canCall = false;
		this.inTernary = false;
		var tmp;
		var this1;
		this1 = tannus_io_impl_BrowserBinary.alloc(0);
		tmp = this1;
		this.bytes = new tannus_io_ByteStack(tmp);
	}
	,save: function() {
		return { 'tokens' : this.tokens.slice(), 'bytes' : this.bytes.copy(), 'canCall' : this.canCall};
	}
	,restore: function(s) {
		this.bytes = s.bytes;
		this.tokens = s.tokens;
		this.canCall = s.canCall;
	}
	,next: function() {
		return this.bytes.peek();
	}
	,advance: function() {
		return this.bytes.pop();
	}
	,last: function() {
		return this.tokens.pop();
	}
	,isIdent: function(c) {
		var tmp;
		if(!(c >= 48 && c <= 57)) {
			var tmp1;
			if(c >= 65) tmp1 = c <= 90; else tmp1 = false;
			if(!tmp1) {
				if(c >= 97) tmp = c <= 122; else tmp = false;
			} else tmp = true;
		} else tmp = true;
		return tmp || c == 46 || c == 95;
	}
	,isOpChar: function(c) {
		return Lambda.has(["=","!","<",">","$","^"],String.fromCharCode(c));
	}
	,isOperator: function(op) {
		return Lambda.has(this.operators,op);
	}
	,isKeyword: function(id) {
		return Lambda.has(["if"],id.toLowerCase());
	}
	,get_end: function() {
		return this.bytes.get_empty();
	}
	,__class__: tannus_nore_Lexer
	,__properties__: {get_end:"get_end"}
};
var tannus_nore_ORegEx = function() { };
$hxClasses["tannus.nore.ORegEx"] = tannus_nore_ORegEx;
tannus_nore_ORegEx.__name__ = ["tannus","nore","ORegEx"];
tannus_nore_ORegEx.compile = function(sel,pred) {
	var comp = new tannus_nore_Compiler();
	if(pred != null) pred(comp);
	return comp.compileString(sel);
};
var tannus_nore_Parser = function() {
	this.reset();
};
$hxClasses["tannus.nore.Parser"] = tannus_nore_Parser;
tannus_nore_Parser.__name__ = ["tannus","nore","Parser"];
tannus_nore_Parser.parseTokens = function(tree) {
	return new tannus_nore_Parser().parse(tree);
};
tannus_nore_Parser.parseString = function(s) {
	var tmp;
	var tree = new tannus_nore_Lexer().lex(s);
	tmp = new tannus_nore_Parser().parse(tree);
	return tmp;
};
tannus_nore_Parser.prototype = {
	parse: function(tokenList) {
		this.reset();
		this.tokens = new tannus_ds_Stack(tokenList);
		while(!this.tokens.get_empty()) this.tree.push(this.nextCheck());
		return this.tree;
	}
	,nextCheck: function() {
		var t = this.tokens.pop();
		switch(t[1]) {
		case 0:
			switch(t[2][1]) {
			case 0:
				return tannus_nore_Check.TypeCheck(t[2][2]);
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 12:
			t = this.tokens.pop();
			switch(t[1]) {
			case 0:
				switch(t[2][1]) {
				case 0:
					return tannus_nore_Check.LooseTypeCheck(t[2][2]);
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 13:
			t = this.tokens.pop();
			switch(t[1]) {
			case 0:
				switch(t[2][1]) {
				case 0:
					return tannus_nore_Check.ShortTypeCheck(t[2][2]);
				default:
					throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
			}
			break;
		case 2:
			var group = t[2];
			switch(group.length) {
			case 1:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						return tannus_nore_Check.FieldExistsCheck(group[0][2][2]);
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			case 3:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						switch(group[1][1]) {
						case 1:
							var op = group[1][2];
							var op1 = group[1][2];
							switch(group[1][2]) {
							case "=>":
								var valueToken = group[2];
								var valueToken1 = group[2];
								switch(group[2][1]) {
								case 3:
									{
										var _g = this.sub(group[2][2]);
										return tannus_nore_Check.FieldValueBlockCheck(group[0][2][2],_g);
									}
									break;
								default:
									switch(group[0][2][2]) {
									case "this":
										return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken));
									default:
										return tannus_nore_Check.FieldValueCheck(op1,group[0][2][2],tannus_nore_ValueTools.toValue(valueToken1));
									}
								}
								break;
							case "is":
								var valueToken2 = group[2];
								var valueToken3 = group[2];
								switch(group[2][1]) {
								case 0:
									switch(group[2][2][1]) {
									case 0:
										return tannus_nore_Check.FieldValueTypeCheck(group[0][2][2],group[2][2][2],false);
									default:
										switch(group[0][2][2]) {
										case "this":
											return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken2));
										default:
											return tannus_nore_Check.FieldValueCheck(op1,group[0][2][2],tannus_nore_ValueTools.toValue(valueToken3));
										}
									}
									break;
								default:
									switch(group[0][2][2]) {
									case "this":
										return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken2));
									default:
										return tannus_nore_Check.FieldValueCheck(op1,group[0][2][2],tannus_nore_ValueTools.toValue(valueToken3));
									}
								}
								break;
							default:
								switch(group[0][2][2]) {
								case "this":
									var valueToken4 = group[2];
									return tannus_nore_Check.NestedCheck(op,tannus_nore_ValueTools.toValue(valueToken4));
								default:
									var valueToken5 = group[2];
									return tannus_nore_Check.FieldValueCheck(op1,group[0][2][2],tannus_nore_ValueTools.toValue(valueToken5));
								}
							}
							break;
						default:
							throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			case 4:
				switch(group[0][1]) {
				case 0:
					switch(group[0][2][1]) {
					case 0:
						switch(group[1][1]) {
						case 1:
							switch(group[1][2]) {
							case "is":
								switch(group[2][1]) {
								case 12:
									switch(group[3][1]) {
									case 0:
										switch(group[3][2][1]) {
										case 0:
											return tannus_nore_Check.FieldValueTypeCheck(group[0][2][2],group[3][2][2],true);
										default:
											throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
										}
										break;
									default:
										throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
									}
									break;
								default:
									throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
								}
								break;
							default:
								throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
							}
							break;
						default:
							throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
						}
						break;
					default:
						throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
					}
					break;
				default:
					throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
				}
				break;
			default:
				throw new js__$Boot_HaxeError("SyntaxError: " + Std.string(group) + " is not a valid field-check!");
			}
			break;
		case 4:
			var subChecks = this.sub(t[2]);
			return tannus_nore_Check.GroupCheck(subChecks);
		case 3:
			var subChecks1 = this.sub(t[2]);
			return tannus_nore_Check.GroupCheck(subChecks1);
		case 7:
			var argTokens = t[3];
			var tmp;
			var _g1 = [];
			var _g11 = 0;
			while(_g11 < argTokens.length) {
				var t1 = argTokens[_g11];
				++_g11;
				_g1.push(tannus_nore_ValueTools.toValue(t1));
			}
			tmp = _g1;
			var args = tmp;
			return tannus_nore_Check.HelperCheck(t[2],args);
		case 10:
			var left = this.tree.pop();
			var right = this.nextCheck();
			if(left == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected \"|\"!"); else switch(left[1]) {
			default:
				if(right == null) throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!"); else switch(right[1]) {
				default:
					return tannus_nore_Check.EitherCheck(left,right);
				}
			}
			break;
		case 11:
			var check = this.nextCheck();
			if(check != null) return tannus_nore_Check.InvertedCheck(check); else throw new js__$Boot_HaxeError("SyntaxError: Unexpected end of input!");
			break;
		case 8:
			var telse = t[4];
			var toks = [t[2],t[3]];
			if(telse != null) toks.push(telse);
			var chl = this.sub(toks);
			return Type.createEnum(tannus_nore_Check,"TernaryCheck",chl);
		default:
			throw new js__$Boot_HaxeError("SyntaxError: Unexpected " + Std.string(t) + "!");
		}
	}
	,reset: function() {
		this.tokens = new tannus_ds_Stack();
		this.tree = [];
	}
	,token: function() {
		return this.tokens.pop();
	}
	,last: function() {
		return this.tree.pop();
	}
	,save: function() {
		return { 'tokens' : this.tokens.copy(), 'tree' : this.tree.slice()};
	}
	,restore: function(s) {
		this.tokens = s.tokens;
		this.tree = s.tree;
	}
	,sub: function(toks) {
		var child = new tannus_nore_Parser();
		return child.parse(toks);
	}
	,get_end: function() {
		return this.tokens.get_empty();
	}
	,__class__: tannus_nore_Parser
	,__properties__: {get_end:"get_end"}
};
var tannus_nore__$Selector_Selector_$Impl_$ = {};
$hxClasses["tannus.nore._Selector.Selector_Impl_"] = tannus_nore__$Selector_Selector_$Impl_$;
tannus_nore__$Selector_Selector_$Impl_$.__name__ = ["tannus","nore","_Selector","Selector_Impl_"];
tannus_nore__$Selector_Selector_$Impl_$._new = function(s) {
	return new tannus_nore_CSelector(s);
};
tannus_nore__$Selector_Selector_$Impl_$.invert = function(this1) {
	return this1.invert();
};
tannus_nore__$Selector_Selector_$Impl_$.sum = function(this1,other) {
	return this1.sum(other);
};
tannus_nore__$Selector_Selector_$Impl_$.diff = function(this1,other) {
	return this1.diff(other);
};
tannus_nore__$Selector_Selector_$Impl_$.toPredicate = function(this1) {
	return this1.f;
};
tannus_nore__$Selector_Selector_$Impl_$.toString = function(this1) {
	return this1.toString();
};
tannus_nore__$Selector_Selector_$Impl_$.fromString = function(s) {
	return new tannus_nore_CSelector(s);
};
var tannus_nore_CSelector = function(sel) {
	this.selector = sel;
	this.f = tannus_nore_ORegEx.compile(sel);
};
$hxClasses["tannus.nore.CSelector"] = tannus_nore_CSelector;
tannus_nore_CSelector.__name__ = ["tannus","nore","CSelector"];
tannus_nore_CSelector.prototype = {
	test: function(o) {
		return this.f(o);
	}
	,filter: function(list) {
		return list.filter(this.f);
	}
	,clone: function() {
		return new tannus_nore_CSelector(this.selector);
	}
	,toString: function() {
		return "Selector(" + this.selector + ")";
	}
	,invert: function() {
		return new tannus_nore_CSelector("!(" + this.selector + ")");
	}
	,sum: function(other) {
		return new tannus_nore_CSelector(this.selector + other.selector);
	}
	,diff: function(other) {
		var tmp;
		var s = this.selector + other.invert().selector;
		tmp = new tannus_nore_CSelector(s);
		return tmp;
	}
	,__class__: tannus_nore_CSelector
};
var tannus_nore_Token = $hxClasses["tannus.nore.Token"] = { __ename__ : ["tannus","nore","Token"], __constructs__ : ["TConst","TOperator","TBrackets","TBoxBrackets","TGroup","TTuple","TCall","THelper","TIf","TComma","TOr","TNot","TApprox","TDoubleDot"] };
tannus_nore_Token.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TOperator = function(op) { var $x = ["TOperator",1,op]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TBrackets = function(tree) { var $x = ["TBrackets",2,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TBoxBrackets = function(tree) { var $x = ["TBoxBrackets",3,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TGroup = function(tree) { var $x = ["TGroup",4,tree]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TTuple = function(values) { var $x = ["TTuple",5,values]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TCall = function(id,args) { var $x = ["TCall",6,id,args]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.THelper = function(id,args) { var $x = ["THelper",7,id,args]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TIf = function(test,then,otherwise) { var $x = ["TIf",8,test,then,otherwise]; $x.__enum__ = tannus_nore_Token; $x.toString = $estr; return $x; };
tannus_nore_Token.TComma = ["TComma",9];
tannus_nore_Token.TComma.toString = $estr;
tannus_nore_Token.TComma.__enum__ = tannus_nore_Token;
tannus_nore_Token.TOr = ["TOr",10];
tannus_nore_Token.TOr.toString = $estr;
tannus_nore_Token.TOr.__enum__ = tannus_nore_Token;
tannus_nore_Token.TNot = ["TNot",11];
tannus_nore_Token.TNot.toString = $estr;
tannus_nore_Token.TNot.__enum__ = tannus_nore_Token;
tannus_nore_Token.TApprox = ["TApprox",12];
tannus_nore_Token.TApprox.toString = $estr;
tannus_nore_Token.TApprox.__enum__ = tannus_nore_Token;
tannus_nore_Token.TDoubleDot = ["TDoubleDot",13];
tannus_nore_Token.TDoubleDot.toString = $estr;
tannus_nore_Token.TDoubleDot.__enum__ = tannus_nore_Token;
var tannus_nore_Const = $hxClasses["tannus.nore.Const"] = { __ename__ : ["tannus","nore","Const"], __constructs__ : ["CIdent","CString","CReference","CNumber"] };
tannus_nore_Const.CIdent = function(id) { var $x = ["CIdent",0,id]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CString = function(s,quotes) { var $x = ["CString",1,s,quotes]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CReference = function(name) { var $x = ["CReference",2,name]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
tannus_nore_Const.CNumber = function(n) { var $x = ["CNumber",3,n]; $x.__enum__ = tannus_nore_Const; $x.toString = $estr; return $x; };
var tannus_nore_Value = $hxClasses["tannus.nore.Value"] = { __ename__ : ["tannus","nore","Value"], __constructs__ : ["VString","VNumber","VArray","VField"] };
tannus_nore_Value.VString = function(str) { var $x = ["VString",0,str]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VNumber = function(num) { var $x = ["VNumber",1,num]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VArray = function(values) { var $x = ["VArray",2,values]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
tannus_nore_Value.VField = function(name) { var $x = ["VField",3,name]; $x.__enum__ = tannus_nore_Value; $x.toString = $estr; return $x; };
var tannus_nore_ValueTools = function() { };
$hxClasses["tannus.nore.ValueTools"] = tannus_nore_ValueTools;
tannus_nore_ValueTools.__name__ = ["tannus","nore","ValueTools"];
tannus_nore_ValueTools.toValue = function(t) {
	switch(t[1]) {
	case 0:
		switch(t[2][1]) {
		case 1:
			return tannus_nore_Value.VString(t[2][2]);
		case 3:
			return tannus_nore_Value.VNumber(t[2][2]);
		case 2:
			return tannus_nore_Value.VField(t[2][2]);
		default:
			throw new js__$Boot_HaxeError("ValueError: Cannot get a Value from " + Std.string(t) + "!");
		}
		break;
	case 5:
		var values = t[2].map(tannus_nore_ValueTools.toValue);
		return tannus_nore_Value.VArray(values);
	default:
		throw new js__$Boot_HaxeError("ValueError: Cannot get a Value from " + Std.string(t) + "!");
	}
};
tannus_nore_ValueTools.haxeValue = function(val,tools,o) {
	switch(val[1]) {
	case 0:
		var str = val[2];
		return function() {
			return str;
		};
	case 1:
		var num = val[2];
		return function() {
			return num;
		};
	case 2:
		var values = val[2];
		return function() {
			var tmp;
			var _g = [];
			var _g1 = 0;
			while(_g1 < values.length) {
				var v = values[_g1];
				++_g1;
				_g.push(tannus_nore_ValueTools.haxeValue(v,tools,o));
			}
			tmp = _g;
			return tmp;
		};
	case 3:
		var name = val[2];
		return function() {
			return tools.get(o,name);
		};
	}
};
var tannus_sys__$Mime_Mime_$Impl_$ = {};
$hxClasses["tannus.sys._Mime.Mime_Impl_"] = tannus_sys__$Mime_Mime_$Impl_$;
tannus_sys__$Mime_Mime_$Impl_$.__name__ = ["tannus","sys","_Mime","Mime_Impl_"];
tannus_sys__$Mime_Mime_$Impl_$.__properties__ = {get_subtype:"get_subtype",get_type:"get_type"}
tannus_sys__$Mime_Mime_$Impl_$._new = function(m) {
	return m;
};
tannus_sys__$Mime_Mime_$Impl_$.get_type = function(this1) {
	return tannus_ds_StringUtils.has(this1,"/")?this1.substring(0,this1.indexOf("/")):this1;
};
tannus_sys__$Mime_Mime_$Impl_$.get_subtype = function(this1) {
	var st = tannus_ds_StringUtils.has(this1,"/")?this1.substring(this1.indexOf("/") + 1):null;
	if(st == null) return null;
	return tannus_ds_StringUtils.before(tannus_ds_StringUtils.after(st,"."),"+");
};
tannus_sys__$Mime_Mime_$Impl_$.getSegments = function(this1) {
	var res = [];
	res = res.concat(this1.split("/"));
	var last;
	if(res.length == 2) {
		last = res.pop();
		var subs = last.split(".");
		res = res.concat(subs);
		last = res.pop();
		if(tannus_ds_StringUtils.has(last,"+")) {
			var suff = last.split("+");
			res = res.concat(suff);
		} else res.push(last);
	}
	return res;
};
tannus_sys__$Mime_Mime_$Impl_$.getMainType = function(this1) {
	return tannus_ds_StringUtils.has(this1,"/")?this1.substring(0,this1.indexOf("/")):this1;
};
tannus_sys__$Mime_Mime_$Impl_$.getSubType = function(this1) {
	return tannus_ds_StringUtils.has(this1,"/")?this1.substring(this1.indexOf("/") + 1):null;
};
tannus_sys__$Mime_Mime_$Impl_$.getTree = function(this1) {
	var st = tannus_ds_StringUtils.has(this1,"/")?this1.substring(this1.indexOf("/") + 1):null;
	if(st == null) return null; else if(tannus_ds_StringUtils.has(st,".")) return st.substring(0,st.indexOf(".")); else return null;
};
var tannus_utils__$Error_Error_$Impl_$ = {};
$hxClasses["tannus.utils._Error.Error_Impl_"] = tannus_utils__$Error_Error_$Impl_$;
tannus_utils__$Error_Error_$Impl_$.__name__ = ["tannus","utils","_Error","Error_Impl_"];
tannus_utils__$Error_Error_$Impl_$._new = function(message) {
	return new tannus_utils_JavaScriptError(message);
};
tannus_utils__$Error_Error_$Impl_$.toString = function(this1) {
	return Std.string(this1);
};
var tannus_utils_JavaScriptError = function(message) {
	Error.call(this,message);
};
$hxClasses["tannus.utils.JavaScriptError"] = tannus_utils_JavaScriptError;
tannus_utils_JavaScriptError.__name__ = ["tannus","utils","JavaScriptError"];
tannus_utils_JavaScriptError.__super__ = Error;
tannus_utils_JavaScriptError.prototype = $extend(Error.prototype,{
	__class__: tannus_utils_JavaScriptError
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
tannus_ds_Memory.state = 0;
tannus_ds_Memory.used = [];
tannus_geom_Matrix.__identity = new tannus_geom_Matrix();
tannus_math_TMath.E = 2.718281828459045;
tannus_math_TMath.LN2 = 0.6931471805599453;
tannus_math_TMath.LN10 = 2.302585092994046;
tannus_math_TMath.LOG2E = 1.4426950408889634;
tannus_math_TMath.LOG10E = 0.43429448190325176;
tannus_math_TMath.PI = 3.141592653589793;
tannus_math_TMath.SQRT1_2 = 0.7071067811865476;
tannus_math_TMath.SQRT2 = 1.4142135623730951;
tannus_math_TMath.KAPPA = 4 * (Math.sqrt(2) - 1) / 3;
tannus_math_TMath.INT_MIN = -2147483648;
tannus_math_TMath.INT_MAX = 2147483647;
tannus_math_TMath.FLOAT_MIN = -1.79769313486231e+308;
tannus_math_TMath.FLOAT_MAX = 1.79769313486231e+308;
WorkerMain.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

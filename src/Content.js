import { clear } from "@testing-library/user-event/dist/clear"
import { useRef, useEffect, useState } from "react"
/* SỬ DỤNG USEEFFECT
1.useEffect(callback) (trường hợp ít dùng)
 --->gọi callback mỗi khi re-render
 - Gọi callback sau khi component thêm element vào DOM
2.useEffect(callback,[deps])
    ----> chỉ gọi callback 1 lần sau khi component được mounted
3.useEffect(callback,[])
    ---->gọi callback mỗi khi re-render và
        callback sẽ được gọi lại mỗi khi deps thay đổi
*** thứ tự thực hiện useEF:
    - cập nhật lại state
    - cập nhật DOM
    - render lại UI
    - gọi cleanup nếu deps thay đổi
    - giờ mới nhảy vào làm callback thực hiện logic

*** NẾU SỬ DỤNG useLayoutEffect call back: giống useEffect (cứ thay chữ useEffect bằng useLayoutEffect)
    nhưng sẽ render UI vào bước cuối (tức là các bước trên đã làm xong)
    sử dụng cho việc cần reset lại
*/

/* 
- callback luôn được gọi sau khi component mounted
/*sử dụng: useRef: để sử dụng biến ngoại vi, nếu chỉ dùng let thì khi hàm app render lại nó lại về undefined
    vì vậy sử dụng useRef, ví dụ cho userRef(24), thì khi hàm chạy lại thì nó không bắt đầu từ 24 giống let
    tức là giá trị biến sẽ được lưu ngoài phạm vi của app, không bị thay đổi nếu app chạy lại
*/

/*sử dụng: memo . có tác dụng không rereder lại những thằng con cố định
ví dụ khi số đếm nhảy, trong return có cpn con, thì thằng con sử dụng memo sẽ chỉ render ra 1 lần rồi đứng đó
nó chỉ sử dụng toán tử 3 dấu bằng, nếu true khi truyền prop vào component con và sử dụng nó thì nó sẽ render nhiều lần
cách dùng: (user vào từ react nhưng không phải 1 hook đâu nha),
        ở cuối cpn con: export default memo(Content)
        nó gọi là HOC: higher order component
*/
/* SỬ DỤNG useCallback: Vấn đề là khi truyền prop là 1 hàm (handle chẳng hạn) làm momo hiểu nhầm  mặc dù nội dung hàm không thay đổi
    nó sẽ lưu hàm vào 1 ô nhớ và sẽ khác nhau nếu sử dụng === mặc dù hàm giống nhau
    vì vậy sử dụng useCallback tương tự useEffect, tham số thứ 2 là [] để hàm (ví dụ handle) không bị gọi lại một cách lãng phí
    ** PHẢI ĐI CHUNG VỚI MEMO
*/
/* SỬ DỤNG useMemo: Để cho các logic không bị thực hiện nhiều lần
    sử dụng giống useEffect (ràng buộc thay đổi dữ liệu)
    useMemo là 1 hook, khác với Memo ở trên, memo ở trên là bọc 1 hàm để cpn không render nhiều lần
*/


// bài tập: hiển thị message theo group
// function Content() {
//     const group = [
//         {
//             id: 1,
//             name: 'nhóm giày bóng đá'
//         },
//         {
//             id: 2,
//             name: 'nhóm cùng nhau kiếm tiền'
//         },
//         {
//             id: 3,
//             name: 'nhóm anti pinetwork & đa cấp'
//         },
//     ]

//     const [active, setActive] = useState()
//     const [comments, setComments] = useState([])

//     useEffect(() => {
//         const handleComment = (e) => {

//             setComments(prevComments => ({
//                 ...prevComments, [active]: prevComments[active] ? [...prevComments[active], e.detail] : [e.detail]
//             }));

//         }
//         window.addEventListener(`group-${active}`, handleComment)
//         // ham don dep
//         return () => {
//             window.removeEventListener(`group-${active}`, handleComment)
//         }
//     }, [active])
//     console.log(comments)
//     return (
//         <>
//             <div>
//                 <ul>
//                     {
//                         group.map(group => (
//                             <li key={group.id}
//                                 style={{ color: active === group.id ? 'red' : '#333' }}
//                                 onClick={() => setActive(group.id)}
//                             >
//                                 {group.name}
//                             </li>
//                         ))
//                     }
//                 </ul>
//                 <h1>Noi dung</h1>
//                 <ul>
//                     {
//                         comments[active]?.map((comment, index) => (
//                             <li key={index}
//                             >
//                                 {comment}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div >
//         </>
//     )
// }

//Bài tập: đếm số ngược
function Content() {
    const [count, setCount] = useState(60)

    const timerID = useRef()

    const prevH1 = useRef()

    useEffect(() => {
        console.log(prevH1.current);
    }, [count])

    const handleStart = () => {
        timerID.current = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 1000)
        console.log(timerID.current)
    }

    const handleStop = () => {
        clearInterval(timerID.current)
        console.log(timerID.current)
    }

    return (
        <div style={{ padding: 20 }}>
            <h1 ref={prevH1}>{count}</h1>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>

    )
}
export default Content